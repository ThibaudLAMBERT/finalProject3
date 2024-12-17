#version 330 core

in vec3 color;
in vec3 worldPosition;
in vec3 worldNormal;
in vec4 fragPos;

out vec3 finalColor;

uniform vec3 lightPosition;
uniform vec3 lightIntensity;
uniform mat4 lightSpaceMatrix;
uniform sampler2D shadowMap;

void main()
{
    // TODO: lighting, tone mapping, gamma correction

	vec3 lightDir = normalize(lightPosition - worldPosition);


    float distance = length(lightPosition - worldPosition);

    float cosTheta = dot(normalize(worldNormal), lightDir);


    vec3 irradiance = lightIntensity / (4.0 * 3.14159 * distance * distance);

    vec3 diffuse = (color / 3.14159) * cosTheta * irradiance;

    vec3 colorAfterToneMapping = diffuse / (1 + diffuse);

    float gamma =  2.8;

    vec3 gammaCorrectedColor = pow(colorAfterToneMapping, vec3 (1/gamma));

    // Transformer la position du fragment dans l'espace de la lumière
    vec4 shadowCoord = fragPos/ fragPos.w; // Perspective divide
    shadowCoord = shadowCoord * 0.5 + 0.5; // Convertir les coordonnées en [0, 1]

    // Récupérer la profondeur dans la texture de profondeur de la lumière
    float depth = shadowCoord.z;


    float existingDepth = texture(shadowMap, shadowCoord.xy).r;

    // Comparer la profondeur actuelle avec la profondeur dans la texture de profondeur
    float shadow = (depth >= existingDepth + 1e-3) ? 0.2 : 1.0; // Application du biais et de l'ombre

    // Appliquer l'ombre à la couleur calculée après tonemapping
    // Final color (avec ombre)
    finalColor = gammaCorrectedColor * shadow;
}



