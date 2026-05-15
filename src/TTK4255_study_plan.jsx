import { useState, useEffect } from "react";

const DAYS = [
  {
    day: 1,
    title: "Image formation I — projection geometry",
    lectures: ["L03 — Image Formation I"],
    color: "purple",
    tasks: [
      { id: "d1_orientation", label: "Skim V23 + 2024 exam solutions — understand format and point distribution (20 min)" },
      { id: "d1_homogeneous", label: "Homogeneous coordinates: points, lines, planes in projective space" },
      { id: "d1_pinhole", label: "Pinhole camera model: derive the projection equation from first principles" },
      { id: "d1_intrinsics", label: "Intrinsics K: focal length, principal point, pixel aspect ratio, skew" },
      { id: "d1_extrinsics", label: "Extrinsics [R|t]: rigid body motion, rotation matrix, translation vector" },
      { id: "d1_fullproj", label: "Full projection chain: X_world → X_cam → x_image → pixel" },
      { id: "d1_homog_coords", label: "Homogeneous vs Cartesian coordinates — perspective division" },
      { id: "d1_szeliski", label: "Szeliski §2.1 (pp. 36–65) — geometric primitives and transformations" },
      { id: "d1_hz_ch6", label: "H&Z Ch 6 (pp. 153–177) — camera models" },
      { id: "d1_hw3", label: "Work through HW3 (rigid motion) and solution03" },
      { id: "d1_v23", label: "V23 problems 1–7 (notation, camera model, projection)" },
      { id: "d1_notation", label: "Print / save the notation sheet (page 51 of TTK4255_V23_LF.pdf) — use it from now on" },
    ]
  },
  {
    day: 2,
    title: "Image formation II — calibration & distortion",
    lectures: ["L04 — Image Formation II"],
    color: "teal",
    tasks: [
      { id: "d2_distortion", label: "Lens/radial distortion: barrel vs pincushion, the k1/k2/k3 model" },
      { id: "d2_undistort", label: "Undistortion: how distorted and undistorted coordinates relate" },
      { id: "d2_calib_intro", label: "Camera calibration: what it means to estimate K and distortion" },
      { id: "d2_checkerboard", label: "Checkerboard + AprilTags: why mixed pattern, how correspondences are found" },
      { id: "d2_dof_review", label: "Degrees of freedom: 2D homography (8), 2D affine (6), 3D rigid (6)" },
      { id: "d2_quality", label: "Quality indicators: coverage plot, radial reprojection error scatter, variance factor σ₀²" },
      { id: "d2_rotation_advice", label: "Calibration advice: rotations about optical axis, why corners/edges matter" },
      { id: "d2_szeliski", label: "Szeliski §2.1.5 (pp. 63–66) + §11.1 (pp. 685–693)" },
      { id: "d2_hz_ch7", label: "H&Z §7.4 radial distortion (pp. 189–193)" },
      { id: "d2_hw4", label: "Work through HW4 (geometric image formation) and solution04" },
      { id: "d2_calibcode", label: "Read calibrate_camera.py and show_calibration_results.py" },
      { id: "d2_v23", label: "V23 problems 10–17 + 34–38 (camera model, calibration, quality)" },
    ]
  },
  {
    day: 3,
    title: "Feature-based alignment & pose estimation",
    lectures: ["L05 — Feature-based Alignment and Pose Estimation"],
    color: "coral",
    tasks: [
      { id: "d3_homography", label: "Homography H: what it represents, when it's valid (planar scene or pure rotation)" },
      { id: "d3_dlt", label: "Direct Linear Transformation (DLT): derive the linear system from point correspondences" },
      { id: "d3_normdlt", label: "Normalized DLT: why normalization matters, the isotropic scaling step" },
      { id: "d3_ransac_intro", label: "RANSAC: inlier-counting loop, the Fischler-Bolles trial-count formula, practical limitations" },
      { id: "d3_msac", label: "MSAC: how it differs from RANSAC (robust loss function vs binary scoring)" },
      { id: "d3_pnp", label: "Pose estimation (PnP / AbsPose): 3D–2D correspondences, calibrated vs uncalibrated" },
      { id: "d3_reprojection", label: "Reprojection error: definition, how it's used in RANSAC thresholding" },
      { id: "d3_szeliski", label: "Szeliski §8.1.4 (pp. 510–513) RANSAC + §11.2 (pp. 693–703) pose estimation" },
      { id: "d3_hz_ch4", label: "H&Z Ch 4 (pp. 87–131) — DLT and estimation of 2D projective transformations" },
      { id: "d3_hz_ch5", label: "H&Z Ch 5 (pp. 132–150) — algorithm evaluation and error analysis" },
      { id: "d3_hw5", label: "Work through HW5 and solution05" },
      { id: "d3_v23", label: "V23 problems 23–25 + 44–46 (homography, AbsPose, RANSAC/MSAC)" },
    ]
  },
  {
    day: 4,
    title: "Iterative pose estimation & nonlinear optimization",
    lectures: ["L06 — Iterative Pose Estimation and Non-linear Optimization"],
    color: "blue",
    tasks: [
      { id: "d4_nlls", label: "Nonlinear least-squares: problem formulation, cost function, residual vector" },
      { id: "d4_jacobian", label: "Jacobian J: how to build it for the reprojection problem (link to TTK4135 material)" },
      { id: "d4_gn", label: "Gauss-Newton: derive the update step J^T J Δp = -J^T r" },
      { id: "d4_lm", label: "Levenberg-Marquardt: the damping term λ, behaviour between GN and gradient descent" },
      { id: "d4_rotparam", label: "Parameterising rotations in optimisation: why not use R directly, angle-axis / quaternion / SO(3) updates" },
      { id: "d4_convergence", label: "Convergence: local vs global minima, initialisation sensitivity" },
      { id: "d4_ba", label: "Bundle adjustment: what it optimises (all poses + all points jointly), sparsity" },
      { id: "d4_szeliski", label: "Szeliski §A.3 (pp. 930–932), §B.1–B.2 (pp. 941–945), §11.4.2 (pp. 717–719)" },
      { id: "d4_hw6", label: "Work through HW6 (Quanser helicopter) notebook + solution06" },
      { id: "d4_code", label: "Trace gauss_newton.py and quanser.py — understand the Jacobian construction" },
      { id: "d4_v23", label: "V23 problems 26, 28, 33, 39–40 (optimisation, rigid transform parameterisation, Jacobian)" },
    ]
  },
  {
    day: 5,
    title: "Two-view geometry I — epipolar geometry, E and F",
    lectures: ["L08 — Two-View Geometry (Part I)"],
    color: "amber",
    tasks: [
      { id: "d5_epipolar", label: "Epipolar geometry: epipoles, epipolar lines, epipolar plane" },
      { id: "d5_essential", label: "Essential matrix E: definition, rank-2 constraint, encodes calibrated relative pose" },
      { id: "d5_fundamental", label: "Fundamental matrix F: uncalibrated analogue of E, rank-2, 7 DOF" },
      { id: "d5_constraint", label: "The epipolar constraint: u₂ᵀ F u₁ = 0 — derive it and understand what it means" },
      { id: "d5_8pt", label: "8-point algorithm: linear system, SVD solution, enforcing rank-2 constraint" },
      { id: "d5_normalised8pt", label: "Normalised 8-point algorithm: why normalization matters here too" },
      { id: "d5_degenerate", label: "Degenerate configurations: pure rotation, coplanar points" },
      { id: "d5_szeliski", label: "Szeliski §11.3.1 (pp. 703–708) — 8/7/5-point algorithms" },
      { id: "d5_hz_ch9", label: "H&Z Ch 9 (pp. 239–261) — epipolar geometry and fundamental matrix" },
      { id: "d5_hz_ch11", label: "H&Z Ch 11 (pp. 279–309) — computation of F (normalised 8-point)" },
      { id: "d5_code", label: "Read estimate_E.py, F_from_E.py, epipolar_distance.py" },
      { id: "d5_v23", label: "V23 problems 8–9 + 41–42 (epipolar lines, F matrix, reprojection)" },
    ]
  },
  {
    day: 6,
    title: "Two-view geometry II — triangulation, decomposition, RANSAC",
    lectures: ["L08 — Two-View Geometry (Part II)"],
    color: "pink",
    tasks: [
      { id: "d6_triangulation", label: "Triangulation: DLT-based method, optimal triangulation, why rays don't intersect in practice" },
      { id: "d6_decompE", label: "Decomposing E: four (R, t) candidates from SVD, the four-solution ambiguity" },
      { id: "d6_cheirality", label: "Cheirality constraint: selecting the correct (R, t) by requiring points in front of both cameras" },
      { id: "d6_scale", label: "Scale ambiguity in monocular reconstruction: why t is only recovered up to scale" },
      { id: "d6_ransac_F", label: "RANSAC for F/E estimation: min sample size (7 or 8 points), threshold on epipolar distance" },
      { id: "d6_stereo", label: "Stereo: rectification, disparity, disparity-to-depth formula" },
      { id: "d6_hz_ch10", label: "H&Z Ch 10 (pp. 262–278) — 3D reconstruction of cameras and structure" },
      { id: "d6_hz_ch12", label: "H&Z Ch 12 (pp. 310–324) — structure computation (triangulation)" },
      { id: "d6_szeliski", label: "Szeliski §11.2.4 (pp. 701–703) triangulation + §8.1.4 RANSAC" },
      { id: "d6_code", label: "Trace triangulate_many.py, decompose_E.py, estimate_E_ransac.py, test_triangulate.py" },
      { id: "d6_hw7", label: "Work through HW7 and solution07" },
      { id: "d6_v23", label: "V23 problems 18–22 + 30 + 43 (SfM reconstruction, critical motions, cheirality)" },
      { id: "d6_buffer", label: "Buffer: use remaining time to revisit any Day 1–5 weakness" },
    ]
  },
  {
    day: 7,
    title: "SfM, visual odometry & SLAM",
    lectures: ["L09 — SfM and Visual Odometry", "L10 — Localization and Mapping"],
    color: "green",
    tasks: [
      { id: "d7_sfm", label: "Structure from Motion (SfM): incremental vs global pipeline, what gets estimated" },
      { id: "d7_vo", label: "Visual Odometry (VO): definition, difference from SLAM (no loop closure)" },
      { id: "d7_directvindirect", label: "Direct vs indirect VO: pixel intensity vs feature correspondences" },
      { id: "d7_frontend", label: "VO front-end: feature extraction, matching, motion estimation" },
      { id: "d7_backend", label: "VO back-end: keyframe selection, pose graph, bundle adjustment" },
      { id: "d7_traj_error", label: "Trajectory accuracy: ATE (absolute) and RTE (relative) error metrics" },
      { id: "d7_slam_pipeline", label: "Classical SLAM pipeline: initialisation, tracking, mapping, relocalization" },
      { id: "d7_systems", label: "SLAM systems overview: MonoSLAM, PTAM, ORB-SLAM (indirect) — LSD-SLAM, DTAM (direct)" },
      { id: "d7_vislam", label: "Visual-Inertial SLAM: why add IMU, tight vs loose coupling" },
      { id: "d7_szeliski", label: "Szeliski §11.4.1–11.4.2 (pp. 715–719), §11.5 SLAM (pp. 734–740)" },
      { id: "d7_hw8", label: "Work through HW8 and solution08" },
      { id: "d7_v23", label: "V23 problems 21, 27, 29, 31–32 (SfM, similarity reconstruction, critical motions)" },
    ]
  },
  {
    day: 8,
    title: "Breadth day — image processing, features & recognition",
    lectures: ["L01 — Image Processing", "L02 — Feature Detection", "L07 — Feature Descriptors and Matching", "L11 — Detection and Recognition", "L12 — Vision Transformers"],
    color: "gray",
    tasks: [
      { id: "d8_pointops", label: "Point operators: thresholding, histogram equalization, gamma correction" },
      { id: "d8_linfilt", label: "Linear filtering: convolution, Gaussian kernel, kernel size formula" },
      { id: "d8_harris", label: "Harris corner detector: auto-correlation matrix, eigenvalues, corner/edge/flat classification" },
      { id: "d8_hough", label: "Hough transform: line detection via (ρ, θ) parameter space" },
      { id: "d8_edge", label: "Edge detection: gradient magnitude, Canny pipeline" },
      { id: "d8_scalespace", label: "Scale space: Gaussian pyramid, LoG, DoG approximation" },
      { id: "d8_sift", label: "SIFT descriptor: keypoint detection, orientation assignment, 128-dim descriptor" },
      { id: "d8_matching", label: "Feature matching: SSD/NCC similarity, ratio test, KD-tree for efficiency" },
      { id: "d8_learned", label: "Learned features: SuperPoint (detector+descriptor), SuperGlue/LightGlue (matching), LoFTR (detector-free)" },
      { id: "d8_classif", label: "Image classification: CNN overview, why it outperforms hand-crafted features" },
      { id: "d8_detection", label: "Object detection: two-stage (R-CNN family) vs one-stage (YOLO) approaches" },
      { id: "d8_vit", label: "Vision Transformers: tokens, positional encoding, multi-head attention, ViT vs CNN tradeoffs" },
      { id: "d8_szeliski", label: "Szeliski §3 (pp. 107–142) + §7.1–7.2 (pp. 419–461) + Ch 6 Recognition (pp. 343–416)" },
      { id: "d8_hw1hw2", label: "Skim HW1 + HW2 solutions (image processing + feature detection)" },
    ]
  },
  {
    day: 9,
    title: "First full timed exam",
    lectures: [],
    color: "red",
    tasks: [
      { id: "d9_prep", label: "Print or open notation sheet (V23 page 51) — this is your only allowed reference" },
      { id: "d9_exam1", label: "Do TTK4255_S22_EXAM.pdf under full exam conditions: 4 hours, no notes" },
      { id: "d9_grade", label: "Grade against TTK4255_S22_LF.pdf — tally score and identify failed topics" },
      { id: "d9_review1", label: "Deep review: revisit lecture + book section for every wrong answer" },
      { id: "d9_exam2", label: "Optional: attempt V22 exam (TTK4255_V22_LF.pdf) if time allows" },
      { id: "d9_weaklist", label: "Write a short list of your 3–5 weakest areas going into Day 10" },
    ]
  },
  {
    day: 10,
    title: "Second full timed exam & final consolidation",
    lectures: [],
    color: "purple",
    tasks: [
      { id: "d10_exam", label: "Do exam_2024_solutions.pdf questions under full exam conditions (4 hours)" },
      { id: "d10_grade", label: "Grade against the 2024 solutions — compare with Day 9 score" },
      { id: "d10_weak", label: "Spend 1–2 hours on your Day 9 weak-list items" },
      { id: "d10_pseudocode", label: "Practise pseudo-code: write out RANSAC, DLT, 8-point algorithm, Gauss-Newton from memory" },
      { id: "d10_notation", label: "Re-read notation sheet once — make sure every symbol in A.1–A.19 is second nature" },
      { id: "d10_v23scan", label: "Scan any V23 problems you haven't attempted yet" },
      { id: "d10_done", label: "Exam is 01.06.2026 at 09:00, Sluppenvegen 14. You are ready." },
    ]
  }
];

const COLOR_MAP = {
  purple: { bg: "#EEEDFE", border: "#7F77DD", text: "#3C3489", badge: "#534AB7" },
  teal:   { bg: "#E1F5EE", border: "#1D9E75", text: "#085041", badge: "#0F6E56" },
  coral:  { bg: "#FAECE7", border: "#D85A30", text: "#712B13", badge: "#993C1D" },
  blue:   { bg: "#E6F1FB", border: "#378ADD", text: "#0C447C", badge: "#185FA5" },
  amber:  { bg: "#FAEEDA", border: "#BA7517", text: "#633806", badge: "#854F0B" },
  pink:   { bg: "#FBEAF0", border: "#D4537E", text: "#72243E", badge: "#993556" },
  green:  { bg: "#EAF3DE", border: "#639922", text: "#27500A", badge: "#3B6D11" },
  gray:   { bg: "#F1EFE8", border: "#888780", text: "#444441", badge: "#5F5E5A" },
  red:    { bg: "#FCEBEB", border: "#E24B4A", text: "#791F1F", badge: "#A32D2D" },
};

const STORAGE_KEY = "ttk4255_checklist_v1";

// Storage wrapper: prefer `window.storage` (for extensions/PWAs), otherwise fall back to localStorage
const storage = {
  async get(key) {
    try {
      if (window.storage && typeof window.storage.get === "function") return await window.storage.get(key);
    } catch (_) {}
    try {
      const v = localStorage.getItem(key);
      return v ? { value: v } : null;
    } catch (_) { return null; }
  },
  async set(key, value) {
    try {
      if (window.storage && typeof window.storage.set === "function") return await window.storage.set(key, value);
    } catch (_) {}
    try {
      localStorage.setItem(key, value);
    } catch (_) {}
  }
};

export default function App() {
  // component implementation copied from original with storage -> storage
  const [checked, setChecked] = useState({});
  const [openDays, setOpenDays] = useState({ 1: true });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await storage.get(STORAGE_KEY);
        if (r && r.value) setChecked(JSON.parse(r.value));
      } catch (_) {}
      setLoaded(true);
    })();
  }, []);

  async function toggle(id) {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try { await storage.set(STORAGE_KEY, JSON.stringify(next)); } catch (_) {}
  }

  function toggleDay(d) {
    setOpenDays(prev => ({ ...prev, [d]: !prev[d] }));
  }

  const totalTasks = DAYS.reduce((a, d) => a + d.tasks.length, 0);
  const totalDone = DAYS.reduce((a, d) => a + d.tasks.filter(t => checked[t.id]).length, 0);
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
        const done = day.tasks.filter(t => checked[t.id]).length;
        const total = day.tasks.length;
        const open = !!openDays[day.day];
        const complete = done === total;

        return (
          <div key={day.day} style={{
            marginBottom: 10,
            border: `0.5px solid ${col.border}`,
            borderRadius: "var(--border-radius-lg)",
            overflow: "hidden",
            background: "var(--color-background-primary)",
          }}>
            <button
              onClick={() => toggleDay(day.day)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "12px 16px", background: col.bg,
                border: "none", cursor: "pointer", textAlign: "left",
              }}
            >
              <span style={{
                width: 28, height: 28, borderRadius: 6,
                background: complete ? col.badge : "transparent",
                border: `1.5px solid ${col.badge}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, fontSize: 13, fontWeight: 500,
                color: complete ? "#fff" : col.text,
                transition: "background 0.2s",
              }}>
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
              <span style={{
                fontSize: 12, fontWeight: 500,
                color: complete ? "#fff" : col.text,
                background: complete ? col.badge : "transparent",
                padding: "2px 8px", borderRadius: 99,
                border: `0.5px solid ${col.border}`,
                whiteSpace: "nowrap"
              }}>
                {done}/{total}
              </span>
              <i className={`ti ti-chevron-${open ? "up" : "down"}`} style={{ fontSize: 16, color: col.text, flexShrink: 0 }} aria-hidden="true" />
            </button>

            {open && (
              <div style={{ padding: "8px 16px 12px" }}>
                {day.tasks.map((task, i) => (
                  <label key={task.id} style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    padding: "7px 0",
                    borderBottom: i < day.tasks.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none",
                    cursor: "pointer",
                  }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1,
                      border: `1.5px solid ${checked[task.id] ? col.badge : "var(--color-border-secondary)"}`,
                      background: checked[task.id] ? col.badge : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.15s",
                    }} onClick={() => toggle(task.id)}>
                      {checked[task.id] && <i className="ti ti-check" style={{ fontSize: 11, color: "#fff" }} aria-hidden="true" />}
                    </div>
                    <span style={{
                      fontSize: 13.5,
                      color: checked[task.id] ? "var(--color-text-tertiary)" : "var(--color-text-primary)",
                      textDecoration: checked[task.id] ? "line-through" : "none",
                      lineHeight: 1.5,
                    }} onClick={() => toggle(task.id)}>
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
