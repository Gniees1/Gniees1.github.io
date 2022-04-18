create database pokefan;
use pokefan;


create table usuario(
id int not null auto_increment,
nombreCompleto varchar(100) not null,
email varchar(60) not null unique,
pass varchar(60) not null,
primary key(id)
);

create table pokemon(
id int not null auto_increment,
nombre varchar(100) not null,
tipo varchar(60) not null,
imagen varchar(60) not null,
apodo varchar(255) null,
primary key(id)
);



create table usuarioPokemon(
id int not null auto_increment,
usuarioId int not null,
pokemonId int not null,
primary key(id),
foreign key(usuarioId) references usuario(id),
foreign key(pokemonId) references pokemon(id)
);