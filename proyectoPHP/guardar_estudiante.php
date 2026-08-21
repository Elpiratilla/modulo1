<?php
include("conexion.php");

$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$correo = $_POST['correo'];
$edad = $_POST['edad'];

$sql = "INSERT INTO estudiantes (nombre, apellido, correo, edad)
        VALUES ('$nombre', '$apellido', '$correo', '$edad')";

$conexion->query($sql);
header("Location: listar_estudiantes.php");
exit;
?>
