<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Gestión de Estudiantes</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
  <div class="container">
    <a class="navbar-brand" href="listar_estudiantes.php">Sistema Estudiantes</a>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto">
        <?php if (isset($_SESSION['usuario'])): ?>
          <li class="nav-item"><a class="nav-link" href="listar_estudiantes.php">Inicio</a></li>
          <li class="nav-item"><a class="nav-link" href="logout.php">Cerrar sesión</a></li>
        <?php else: ?>
          <li class="nav-item"><a class="nav-link" href="login.php">Iniciar sesión</a></li>
          <li class="nav-item"><a class="nav-link" href="registro_usuario.php">Registrarse</a></li>
        <?php endif; ?>
      </ul>
    </div>
  </div>
</nav>
<?php include("conexion.php"); ?>
<div class="card mx-auto" style="max-width: 400px;">
  <div class="card-body">
    <h3 class="text-center">Registro de Usuario</h3>
    <form method="POST">
      <div class="mb-3">
        <label>Nombre de usuario</label>
        <input type="text" name="nombre_usuario" class="form-control" required>
      </div>
      <div class="mb-3">
        <label>Contraseña</label>
        <input type="password" name="contrasena" class="form-control" required>
      </div>
      <button type="submit" name="registrar" class="btn btn-primary w-100">Registrar</button>
    </form>
    <div class="text-center mt-3">
      <a href="login.php">¿Ya tienes cuenta? Inicia sesión</a>
    </div>
  </div>
</div>
<?php
if (isset($_POST['registrar'])) {
    $usuario = $_POST['nombre_usuario'];
    $password = password_hash($_POST['contrasena'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO usuarios (nombre_usuario, contrasena) VALUES ('$usuario', '$password')";
    if ($conexion->query($sql)) {
        echo "<div class='alert alert-success mt-3 text-center'>Usuario registrado correctamente</div>";
    } else {
        echo "<div class='alert alert-danger mt-3 text-center'>Error al registrar</div>";
    }
}
?>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>