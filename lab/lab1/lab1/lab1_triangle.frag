#version 330 core

in vec3 frag_color; //variable d'entrée des couleurs
out vec4 color; //variable de sortie qui sera utile pour transmettre à l'écran

void main() {

        color = vec4(frag_color, 1.0); //utilisation de la varibale d'entrée pour mettre la couleur
}
