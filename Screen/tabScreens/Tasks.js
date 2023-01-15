import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { Asset } from 'expo-asset';
import { Renderer } from 'expo-three';
import { THREE } from 'expo-three';

import * as React from 'react';
import {
    AmbientLight,
    Fog,
    PerspectiveCamera,
    PointLight,
    Scene,
    SpotLight,
} from 'three';
import { GLView } from 'expo-gl';


export default function TasksPage() {

    let timeout;

    React.useEffect(() => {
        // Clear the animation loop when the component unmounts
        return () => clearTimeout(timeout);
    }, []);


    return (
        <GLView
            style={{ flex: 1 }}
            onContextCreate={async (gl) => {
                const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
                const sceneColor = 668096;

                // Create a WebGLRenderer without a DOM element
                const renderer = new Renderer({ gl });
                renderer.setSize(width, height);
                renderer.setClearColor(0x668096);

                const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
                camera.position.set(2, 5, 5);

                const scene = new Scene();
                scene.fog = new Fog(sceneColor, 1, 10000);

                const ambientLight = new AmbientLight(0x101010);
                scene.add(ambientLight);

                const pointLight = new PointLight(0xffffff, 2, 1000, 1);
                pointLight.position.set(0, 200, 200);
                scene.add(pointLight);

                const spotLight = new SpotLight(0xffffff, 0.5);
                spotLight.position.set(0, 500, 100);
                spotLight.lookAt(scene.position);
                scene.add(spotLight);

                const asset = Asset.fromModule(require("./AESLowPoly.obj"));
                await asset.downloadAsync();

                // instantiate a loader
                const loader = new OBJLoader();

                // load a resource
                loader.load(
                    // resource URL
                    asset.localUri,
                    // called when resource is loaded
                    function (object) {
                        //object.scale.set(0.065, 0.065, 0.065)
                        scene.add(object);
                        camera.lookAt(object.position)
                        //rotate my obj file
                        function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
                            object.rotateX(THREE.MathUtils.DEG2RAD.valueOf(degreeX));
                            object.rotateY(THREE.MathUtils.DEG2RAD.valueOf(degreeY));
                            object.rotateZ(THREE.MathUtils.DEG2RAD.valueOf(degreeZ));
                        }

                        // usage:
                        rotateObject(object, 0, 0, 70);

                        //animate rotation
                        function update() {
                            object.rotation.x += 0.015
                        }
                        const render = () => {
                            timeout = requestAnimationFrame(render);
                            update();
                            renderer.render(scene, camera);
                            gl.endFrameEXP();
                        };
                        render();
                    },

                    // called when loading is in progresses
                    function (xhr) {

                        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

                    },
                    // called when loading has errors
                    function (error) {

                        console.log(error);

                    }

                );
            }}
        />
    );
}