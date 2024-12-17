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
    vec4 shadowCoord = fragPos/ fragPos.w;
    shadowCoord = shadowCoord * 0.5 + 0.5;

    float shadow;

    if (shadowCoord.x < 0 || shadowCoord.x > 1 || shadowCoord.y < 0 || shadowCoord.y > 1 || shadowCoord.z < 0 || shadowCoord.z > 1) {
        shadow = 1.0;
    } else {
        float depth = shadowCoord.z;


        float existingDepth = texture(shadowMap, shadowCoord.xy).r;

        shadow = (depth >= existingDepth + 1e-3) ? 0.2 : 1.0;
    }


    finalColor = gammaCorrectedColor * shadow;
}



