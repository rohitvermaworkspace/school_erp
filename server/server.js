const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

// Config
const connectDB = require("./src/config/db");

// Routes
const authRoutes = require("./src/routes/authRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const attendanceRoutes = require("./src/routes/attendanceRoutes");
const teacherRoutes = require("./src/routes/teacherRoutes");
const classRoutes = require("./src/routes/classRoutes");
const subjectRoutes = require("./src/routes/subjectRoutes");
const analyticsRoutes = require("./src/routes/analyticsRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");
const timetableRoutes = require("./src/routes/timetableRoutes");
const noticeRoutes = require('./src//routes/noticeRoutes');
const feeRoutes = require('./src/routes/feeRoutes');
const userRoutes = require('./src/routes/userRoutes');
const settingsRoutes = require('./src/routes/settingsRoutes');
const auditLogRoutes = require('./src/routes/auditLogRoutes');
const markRoutes = require('./src/routes/markRoutes');
const resultRoutes = require('./src/routes/resultRoutes');
const reportCardRoutes = require('./src/routes/reportCardRoutes');
const leaveRoutes = require('./src/routes/leaveRoutes');
const teacherAnalyticsRoutes = require("./src/routes/teacherAnalyticsRoutes");
const studentResultRoutes = require('./src/routes/studentResultRoutes');
const sessionRoutes = require("./src/routes/sessionRoutes");
const adminAnalyticsRoutes = require("./src/routes/adminAnalyticsRoutes");



// Load environment variables
dotenv.config();

// Connect MongoDB
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // React Vite frontend
    credentials: true,
  }),
);

// Create HTTP server for socket.io
const server = http.createServer(app);

// Initialize socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Make io available in controllers
app.set("io", io);

// Socket connection
io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  // Join room example:
  socket.on("join_room", (room) => {
    socket.join(room);

    console.log(`User joined room: ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/subjects", subjectRoutes);
// ANALYTICS
app.use("/api/analytics", analyticsRoutes);
app.use("/api/teacher-analytics", teacherAnalyticsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/timetables", timetableRoutes);
app.use('/api/notices', noticeRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/audit-logs", auditLogRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));
app.use('/api/files', require('./src/routes/fileRoutes'));
app.use("/api/sessions", sessionRoutes);
app.use("/api/admin-analytics", adminAnalyticsRoutes);

app.use('/api/teacher', teacherRoutes);
app.use('/api/marks', markRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/report-cards', reportCardRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/student-results', studentResultRoutes);

// server.js




// Health route
app.get("/", (req, res) => {
  res.send("🚀 School ERP API running...");
});

// Start server
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
