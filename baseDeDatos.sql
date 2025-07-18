create database form;
use form;
create table formulario(
	id int auto_increment primary key,
	rating int not null,
	megusta varchar(10) not null,
	mejoras text,
	errores text,
	recomendaciones text
);