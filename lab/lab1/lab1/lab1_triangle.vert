#version 330 core

layout(location = 0) in vec3 vertexPosition; //decrit l'entrée (la position)
layout(location = 1) in vec3 vertexColor; //ici la couleur

out vec3 frag_color; //La sortie qui sera utile pour transmettre la couleur au fragment

uniform mat4 MVP;

void main() {
     gl_Position = MVP * vec4(vertexPosition, 1.0);
     frag_color = vertexColor; // Donne à la variable de sortie la variable de couleur d'entrée
}
