import React, { useEffect, useState } from "react";

const DAYS = [
  { day: 1, title: "Image processing & feature detection", color: "teal", lectures: ["L01 — Image Processing", "L02 — Feature Detection"], tasks: [{ id: "d1_pointops", label: "Point operators: thresholding, histogram equalization, gamma correction" }, { id: "d1_linfilt", label: "Linear filtering: convolution, Gaussian kernel, kernel size formula" }, { id: "d1_edge", label: "Edge detection: gradient magnitude, Canny pipeline" }, { id: "d1_harris", label: "Harris corner detector: auto-correlation matrix, eigenvalues, corner/edge/flat classification" }, { id: "d1_hough", label: "Hough transform: line detection via (ρ, θ) parameter space" }, { id: "d1_hw1", label: "Work through HW1 + solution01" }, { id: "d1_hw2", label: "Work through HW2 + solution02" }, { id: "d1_notation", label: "Save the notation sheet (page 51 of TTK4255_V23_LF.pdf) — use from now on" }, { id: "d1_orientation", label: "Skim V23 + 2024 exam solutions — understand format and point distribution (20 min)" }] },
  { day: 2, title: "Image formation I — projection geometry", lectures: ["L03 — Image Formation I"], color: "purple", tasks: [{ id: "d2_orientation", label: "Skim V23 + 2024 exam solutions — understand format and point distribution (20 min)" }, { id: "d2_homogeneous", label: "Homogeneous coordinates: points, lines, planes in projective space" }, { id: "d2_pinhole", label: "Pinhole camera model: derive the projection equation from first principles" }, { id: "d2_intrinsics", label: "Intrinsics K: focal length, principal point, pixel aspect ratio, skew" }, { id: "d2_extrinsics", label: "Extrinsics [R|t]: rigid body motion, rotation matrix, translation vector" }, { id: "d2_fullproj", label: "Full projection chain: X_world → X_cam → x_image → pixel" }, { id: "d2_homog_coords", label: "Homogeneous vs Cartesian coordinates — perspective division" }, { id: "d2_szeliski", label: "Szeliski §2.1 (pp. 36–65) — geometric primitives and transformations" }, { id: "d2_hz_ch6", label: "H&Z Ch 6 (pp. 153–177) — camera models" }, { id: "d2_hw3", label: "Work through HW3 (rigid motion) and solution03" }, { id: "d2_v23", label: "V23 problems 1–7 (notation, camera model, projection)" }, { id: "d2_notation", label: "Print / save the notation sheet (page 51 of TTK4255_V23_LF.pdf) — use it from now on" }] },
  { day: 3, title: "Image formation II — calibration & distortion", lectures: ["L04 — Image Formation II"], color: "teal", tasks: [{ id: "d3_distortion", label: "Lens/radial distortion: barrel vs pincushion, the k1/k2/k3 model" }, { id: "d3_undistort", label: "Undistortion: how distorted and undistorted coordinates relate" }, { id: "d3_calib_intro", label: "Camera calibration: what it means to estimate K and distortion" }, { id: "d3_checkerboard", label: "Checkerboard + AprilTags: why mixed pattern, how correspondences are found" }, { id: "d3_dof_review", label: "Degrees of freedom: 2D homography (8), 2D affine (6), 3D rigid (6)" }, { id: "d3_quality", label: "Quality indicators: coverage plot, radial reprojection error scatter, variance factor σ₀²" }, { id: "d3_rotation_advice", label: "Calibration advice: rotations about optical axis, why corners/edges matter" }, { id: "d3_szeliski", label: "Szeliski §2.1.5 (pp. 63–66) + §11.1 (pp. 685–693)" }, { id: "d3_hz_ch7", label: "H&Z §7.4 radial distortion (pp. 189–193)" }, { id: "d3_hw4", label: "Work through HW4 (geometric image formation) and solution04" }, { id: "d3_calibcode", label: "Read calibrate_camera.py and show_calibration_results.py" }, { id: "d3_v23", label: "V23 problems 10–17 + 34–38 (camera model, calibration, quality)" }] },
  { day: 4, title: "Feature-based alignment & pose estimation", lectures: ["L05 — Feature-based Alignment and Pose Estimation"], color: "coral", tasks: [{ id: "d4_homography", label: "Homography H: what it represents, when it's valid (planar scene or pure rotation)" }, { id: "d4_dlt", label: "Direct Linear Transformation (DLT): derive the linear system from point correspondences" }, { id: "d4_normdlt", label: "Normalized DLT: why normalization matters, the isotropic scaling step" }, { id: "d4_ransac_intro", label: "RANSAC: inlier-counting loop, the Fischler-Bolles trial-count formula, practical limitations" }, { id: "d4_msac", label: "MSAC: how it differs from RANSAC (robust loss function vs binary scoring)" }, { id: "d4_pnp", label: "Pose estimation (PnP / AbsPose): 3D–2D correspondences, calibrated vs uncalibrated" }, { id: "d4_reprojection", label: "Reprojection error: definition, how it's used in RANSAC thresholding" }, { id: "d4_szeliski", label: "Szeliski §8.1.4 (pp. 510–513) RANSAC + §11.2 (pp. 693–703) pose estimation" }, { id: "d4_hz_ch4", label: "H&Z Ch 4 (pp. 87–131) — DLT and estimation of 2D projective transformations" }, { id: "d4_hz_ch5", label: "H&Z Ch 5 (pp. 132–150) — algorithm evaluation and error analysis" }, { id: "d4_hw5", label: "Work through HW5 and solution05" }, { id: "d4_v23", label: "V23 problems 23–25 + 44–46 (homography, AbsPose, RANSAC/MSAC)" }] },
  { day: 5, title: "Iterative pose estimation & nonlinear optimization", lectures: ["L06 — Iterative Pose Estimation and Non-linear Optimization"], color: "blue", tasks: [{ id: "d5_nlls", label: "Nonlinear least-squares: problem formulation, cost function, residual vector" }, { id: "d5_jacobian", label: "Jacobian J: how to build it for the reprojection problem (link to TTK4135 material)" }, { id: "d5_gn", label: "Gauss-Newton: derive the update step J^T J Δp = -J^T r" }, { id: "d5_lm", label: "Levenberg-Marquardt: the damping term λ, behaviour between GN and gradient descent" }, { id: "d5_rotparam", label: "Parameterising rotations in optimisation: why not use R directly, angle-axis / quaternion / SO(3) updates" }, { id: "d5_convergence", label: "Convergence: local vs global minima, initialisation sensitivity" }, { id: "d5_ba", label: "Bundle adjustment: what it optimises (all poses + all points jointly), sparsity" }, { id: "d5_szeliski", label: "Szeliski §A.3 (pp. 930–932), §B.1–B.2 (pp. 941–945), §11.4.2 (pp. 717–719)" }, { id: "d5_hw6", label: "Work through HW6 (Quanser helicopter) notebook + solution06" }, { id: "d5_code", label: "Trace gauss_newton.py and quanser.py — understand the Jacobian construction" }, { id: "d5_v23", label: "V23 problems 26, 28, 33, 39–40 (optimisation, rigid transform parameterisation, Jacobian)" }, { id: "d5_earlyfinish", label: "Early finish instruction: if done before 14:00, begin reading H&Z Ch 9 (pp. 239–261) as a head-start on Day 7 — prior exposure makes the hardest day easier" }] },
  { day: 6, title: "Feature descriptors & matching", color: "amber", lectures: ["L07 — Feature Descriptors and Matching"], tasks: [{ id: "d6_scalespace", label: "Scale space: Gaussian pyramid, LoG, DoG approximation" }, { id: "d6_sift", label: "SIFT descriptor: keypoint detection, orientation assignment, 128-dim descriptor" }, { id: "d6_matching", label: "Feature matching: SSD/NCC similarity, ratio test, KD-tree for efficiency" }, { id: "d6_learned", label: "Learned features: SuperPoint (detector+descriptor), SuperGlue/LightGlue (matching), LoFTR (detector-free)" }, { id: "d6_szeliski", label: "Szeliski §7.1–7.2 (pp. 419–461) — feature detection and matching" }, { id: "d6_hw7start", label: "Work through HW7 part 1 — start only, continue on Day 8" }] },
  { day: 7, title: "Two-view geometry I — epipolar geometry, E and F", lectures: ["L08 — Two-View Geometry (Part I)"], color: "amber", tasks: [{ id: "d7_epipolar", label: "Epipolar geometry: epipoles, epipolar lines, epipolar plane" }, { id: "d7_essential", label: "Essential matrix E: definition, rank-2 constraint, encodes calibrated relative pose" }, { id: "d7_fundamental", label: "Fundamental matrix F: uncalibrated analogue of E, rank-2, 7 DOF" }, { id: "d7_constraint", label: "The epipolar constraint: u₂ᵀ F u₁ = 0 — derive it and understand what it means" }, { id: "d7_8pt", label: "8-point algorithm: linear system, SVD solution, enforcing rank-2 constraint" }, { id: "d7_normalised8pt", label: "Normalised 8-point algorithm: why normalization matters here too" }, { id: "d7_degenerate", label: "Degenerate configurations: pure rotation, coplanar points" }, { id: "d7_szeliski", label: "Szeliski §11.3.1 (pp. 703–708) — 8/7/5-point algorithms" }, { id: "d7_hz_ch9", label: "H&Z Ch 9 (pp. 239–261) — epipolar geometry and fundamental matrix" }, { id: "d7_hz_ch11", label: "H&Z Ch 11 (pp. 279–309) — computation of F (normalised 8-point)" }, { id: "d7_code", label: "Read estimate_E.py, F_from_E.py, epipolar_distance.py" }, { id: "d7_v23", label: "V23 problems 8–9 + 41–42 (epipolar lines, F matrix, reprojection)" }, { id: "d7_hw7", label: "Begin HW7 (linear algorithms) — complete as much as possible today, finish on Day 8" }] },
  { day: 8, title: "Two-view geometry II — triangulation, decomposition, RANSAC", lectures: ["L08 — Two-View Geometry (Part II)"], color: "pink", tasks: [{ id: "d8_triangulation", label: "Triangulation: DLT-based method, optimal triangulation, why rays don't intersect in practice" }, { id: "d8_decompE", label: "Decomposing E: four (R, t) candidates from SVD, the four-solution ambiguity" }, { id: "d8_cheirality", label: "Cheirality constraint: selecting the correct (R, t) by requiring points in front of both cameras" }, { id: "d8_scale", label: "Scale ambiguity in monocular reconstruction: why t is only recovered up to scale" }, { id: "d8_ransac_F", label: "RANSAC for F/E estimation: min sample size (7 or 8 points), threshold on epipolar distance" }, { id: "d8_stereo", label: "Stereo: rectification, disparity, disparity-to-depth formula" }, { id: "d8_hz_ch10", label: "H&Z Ch 10 (pp. 262–278) — 3D reconstruction of cameras and structure" }, { id: "d8_hz_ch12", label: "H&Z Ch 12 (pp. 310–324) — structure computation (triangulation)" }, { id: "d8_szeliski", label: "Szeliski §11.2.4 (pp. 701–703) triangulation + §8.1.4 RANSAC" }, { id: "d8_code", label: "Trace triangulate_many.py, decompose_E.py, estimate_E_ransac.py, test_triangulate.py" }, { id: "d8_hw7finish", label: "Finish HW7 + solution07 (started Day 7)" }, { id: "d8_hw8", label: "Work through HW8 + solution08" }, { id: "d8_v23", label: "V23 problems 18–22 + 30 + 43 (SfM reconstruction, critical motions, cheirality)" }, { id: "d8_buffer", label: "Buffer: use remaining time to revisit any Day 1–5 weakness" }, { id: "d8_protected", label: "Protected day — do not let earlier days bleed in here. L08 is the hardest material; guard this time." }] },
  { day: 9, title: "SfM, VO, SLAM + recognition conceptual sweep", color: "green", lectures: ["L09 — SfM & Visual Odometry", "L10 — Localization and Mapping", "L11 — Detection & Recognition", "L12 — Vision Transformers"], tasks: [{ id: "d9_sfm", label: "Structure from Motion (SfM): incremental vs global pipeline, what gets estimated" }, { id: "d9_vo", label: "Visual Odometry (VO): definition, difference from SLAM (no loop closure)" }, { id: "d9_directvindirect", label: "Direct vs indirect VO: pixel intensity vs feature correspondences" }, { id: "d9_frontend", label: "VO front-end: feature extraction, matching, motion estimation" }, { id: "d9_backend", label: "VO back-end: keyframe selection, pose graph, bundle adjustment" }, { id: "d9_traj_error", label: "Trajectory accuracy: ATE (absolute) and RTE (relative) error metrics" }, { id: "d9_slam_pipeline", label: "Classical SLAM pipeline: initialisation, tracking, mapping, relocalization" }, { id: "d9_systems", label: "SLAM systems overview: MonoSLAM, PTAM, ORB-SLAM (indirect) — LSD-SLAM, DTAM (direct)" }, { id: "d9_vislam", label: "Visual-Inertial SLAM: why add IMU, tight vs loose coupling" }, { id: "d9_szeliski", label: "Szeliski §11.4.1–11.4.2 (pp. 715–719), §11.5 SLAM (pp. 734–740)" }, { id: "d9_v23", label: "V23 problems 21, 27, 29, 31–32 (SfM, similarity reconstruction, critical motions)" }, { id: "d9_cnn", label: "CNN classification: conv → pool → FC chain, why it outperforms hand-crafted features" }, { id: "d9_detection", label: "Object detection: two-stage (Faster R-CNN) vs one-stage (YOLO) — conceptual difference only" }, { id: "d9_vit", label: "Vision Transformers: patch tokens, positional encoding, multi-head self-attention, ViT vs CNN tradeoffs" }, { id: "d9_szeliski_ch6", label: "Szeliski Ch 6 recognition (pp. 343–416) — skim, no deep derivations needed" }, { id: "d9_v23remaining", label: "Scan and attempt all remaining V23 problems not yet done" }] },
  { day: 10, title: "Full timed exam + consolidation", color: "red", lectures: [], tasks: [{ id: "d10_notation", label: "Open notation sheet (V23 page 51) — only reference allowed on the real exam" }, { id: "d10_exam", label: "Do TTK4255_S22_EXAM.pdf under real exam conditions: 4 hours, no notes, no help" }, { id: "d10_grade", label: "Grade against TTK4255_S22_LF.pdf — tally score, write down every topic you got wrong" }, { id: "d10_review", label: "Deep review: for every wrong answer, open the relevant lecture epub + textbook section and re-read" }, { id: "d10_pseudocode", label: "Write from memory (no notes): RANSAC loop, DLT derivation, 8-point algorithm, Gauss-Newton update step" }, { id: "d10_2024", label: "Mine exam_2024_solutions.pdf problem by problem with solutions open — not timed, use it as a final gap-fill" }, { id: "d10_done", label: "Exam: 01.06.2026 · 09:00 · Sluppenvegen 14. You are ready." }] },
];

const COLOR_MAP = {
  purple: { bg: "#EEEDFE", border: "#7F77DD", text: "#3C3489", badge: "#534AB7" },
  teal: { bg: "#E1F5EE", border: "#1D9E75", text: "#085041", badge: "#0F6E56" },
  coral: { bg: "#FAECE7", border: "#D85A30", text: "#712B13", badge: "#993C1D" },
  blue: { bg: "#E6F1FB", border: "#378ADD", text: "#0C447C", badge: "#185FA5" },
  amber: { bg: "#FAEEDA", border: "#BA7517", text: "#633806", badge: "#854F0B" },
  pink: { bg: "#FBEAF0", border: "#D4537E", text: "#72243E", badge: "#993556" },
  green: { bg: "#EAF3DE", border: "#639922", text: "#27500A", badge: "#3B6D11" },
  gray: { bg: "#F1EFE8", border: "#888780", text: "#444441", badge: "#5F5E5A" },
  red: { bg: "#FCEBEB", border: "#E24B4A", text: "#791F1F", badge: "#A32D2D" },
};

const STORAGE_KEY = "ttk4255_checklist_v1";

const storage = {
  async get(key) {
    try {
      if (window.storage && typeof window.storage.get === "function") return await window.storage.get(key);
    } catch (_) {}
    try {
      const value = localStorage.getItem(key);
      return value ? { value } : null;
    } catch (_) {
      return null;
    }
  },
  async set(key, value) {
    try {
      if (window.storage && typeof window.storage.set === "function") return await window.storage.set(key, value);
    } catch (_) {}
    try {
      localStorage.setItem(key, value);
    } catch (_) {}
  },
};

export default function App() {
  const [checked, setChecked] = useState({});
  const [openDays, setOpenDays] = useState({ 1: true });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await storage.get(STORAGE_KEY);
        if (result && result.value) setChecked(JSON.parse(result.value));
      } catch (_) {}
      setLoaded(true);
    })();
  }, []);

  async function toggle(id) {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try {
      await storage.set(STORAGE_KEY, JSON.stringify(next));
    } catch (_) {}
  }

  function toggleDay(day) {
    setOpenDays(previous => ({ ...previous, [day]: !previous[day] }));
  }

  const totalTasks = DAYS.reduce((sum, day) => sum + day.tasks.length, 0);
  const totalDone = DAYS.reduce((sum, day) => sum + day.tasks.filter(task => checked[task.id]).length, 0);
  const pct = Math.round((totalDone / totalTasks) * 100);

  if (!loaded) return <p style={{ color: "var(--color-text-secondary)", padding: "2rem", fontSize: 14 }}>Loading…</p>;

  return (
    <div style={{ padding: "1.5rem 0" }}>
      <h2 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 4px", color: "var(--color-text-primary)" }}>TTK4255 — 10-day study plan</h2>
      <p style={{ margin: "0 0 1.25rem", fontSize: 14, color: "var(--color-text-secondary)" }}>Exam: 01 June 2026 · 09:00 · Sluppenvegen 14</p>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
        <div style={{ flex: 1, height: 8, background: "var(--color-background-secondary)", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: "#1D9E75", borderRadius: 99, transition: "width 0.3s" }} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)", whiteSpace: "nowrap" }}>
          {totalDone} / {totalTasks} tasks · {pct}%
        </span>
      </div>

      {DAYS.map(day => {
        const col = COLOR_MAP[day.color];
        const done = day.tasks.filter(task => checked[task.id]).length;
        const total = day.tasks.length;
        const open = !!openDays[day.day];
        const complete = done === total;

        return (
          <div key={day.day} style={{ marginBottom: 10, border: `0.5px solid ${col.border}`, borderRadius: "var(--border-radius-lg)", overflow: "hidden", background: "var(--color-background-primary)" }}>
            <button
              onClick={() => toggleDay(day.day)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: col.bg, border: "none", cursor: "pointer", textAlign: "left" }}
            >
              <span style={{ width: 28, height: 28, borderRadius: 6, background: complete ? col.badge : "transparent", border: `1.5px solid ${col.badge}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 500, color: complete ? "#fff" : col.text, transition: "background 0.2s" }}>
                {complete ? <i className="ti ti-check" style={{ fontSize: 14 }} aria-hidden="true" /> : day.day}
              </span>
              <span style={{ flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: col.text, display: "block" }}>Day {day.day} — {day.title}</span>
                {day.lectures.length > 0 && (
                  <span style={{ fontSize: 12, color: col.badge, display: "block", marginTop: 1 }}>
                    {day.lectures.join(" · ")}
                  </span>
                )}
              </span>
              <span style={{ fontSize: 12, fontWeight: 500, color: complete ? "#fff" : col.text, background: complete ? col.badge : "transparent", padding: "2px 8px", borderRadius: 99, border: `0.5px solid ${col.border}`, whiteSpace: "nowrap" }}>
                {done}/{total}
              </span>
              <i className={`ti ti-chevron-${open ? "up" : "down"}`} style={{ fontSize: 16, color: col.text, flexShrink: 0 }} aria-hidden="true" />
            </button>

            {open && (
              <div style={{ padding: "8px 16px 12px" }}>
                {day.tasks.map((task, index) => (
                  <label
                    key={task.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      padding: "7px 0",
                      borderBottom: index < day.tasks.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        flexShrink: 0,
                        marginTop: 1,
                        border: `1.5px solid ${checked[task.id] ? col.badge : "var(--color-border-secondary)"}`,
                        background: checked[task.id] ? col.badge : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.15s",
                      }}
                      onClick={() => toggle(task.id)}
                    >
                      {checked[task.id] && <i className="ti ti-check" style={{ fontSize: 11, color: "#fff" }} aria-hidden="true" />}
                    </div>
                    <span
                      style={{
                        fontSize: 13.5,
                        color: checked[task.id] ? "var(--color-text-tertiary)" : "var(--color-text-primary)",
                        textDecoration: checked[task.id] ? "line-through" : "none",
                        lineHeight: 1.5,
                      }}
                      onClick={() => toggle(task.id)}
                    >
                      {task.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: "1.5rem", textAlign: "center" }}>
        Progress is saved automatically in this project.
      </p>
    </div>
  );
}
