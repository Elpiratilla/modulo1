<?php
include("conexion.php");

$id = $_GET['id'];
$conexion->query("DELETE FROM estudiantes WHERE id=$id");

header("Location: listar_estudiantes.php");
exit;
?>
