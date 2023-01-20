import React, { useRef, useState, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber/native'
import { useGLTF, Environment, Grid, Stage, useTexture, useFBX } from '@react-three/drei/native'
import useControls from "r3f-native-orbitcontrols"
import {
    View, Text, StyleSheet, Button
} from 'react-native';
import * as THREE from 'three';

import AESModel from './3DViewPageScreens/AES3D';



function Ground(props) {

    return (
        <mesh
            {...props}
            scale={200}
            rotation={[-Math.PI / 2, 0, 0]}
            castShadow
            receiveShadow
        >

            <planeGeometry args={[1, 1, 1]} />
            <meshStandardMaterial castShadow color='tomato' />

        </mesh>


    )

}






export default function TasksPage() {

    const [viewLayer, setViewLayer] = useState([true, true, true, true, true])


    const [OrbitControls, events] = useControls()



    let camera = new THREE.PerspectiveCamera(90, 1.5, 0.1, 1000);
    let [x, y, z] = [0, 30, 20];
    camera.position.set(x, y, z);



    return (

        <View {...events} style={{ flex: 1 }}>

            <View style={styles.controllerView}>
                <View style={styles.oneLayerControlView}>
                    <Button title='Etage -1' onPress={() => setViewLayer([true, false, false, false, false, false])}>

                    </Button>
                </View>
                <View style={styles.oneLayerControlView}>
                    <Button title='Etage 0-1' onPress={() => setViewLayer([true, true, false, false, false, false])}>

                    </Button>
                </View>
                <View style={styles.oneLayerControlView}>
                    <Button title='Etage 2' onPress={() => setViewLayer([true, true, true, false, false, false])}>

                    </Button>
                </View>
                <View style={styles.oneLayerControlView}>
                    <Button title='Etage 3' onPress={() => setViewLayer([true, true, true, true, false, false])}>

                    </Button>
                </View>
                <View style={styles.oneLayerControlView}>
                    <Button title='Etage4' onPress={() => setViewLayer([true, true, true, true, true, false])}>

                    </Button>
                </View>
                <View style={styles.oneLayerControlView}>
                    <Button title='Gesamt' onPress={() => setViewLayer([true, true, true, true, true, true])}>

                    </Button>
                </View>
            </View>

            <Canvas shadows camera={camera}>
                <color attach="background" args={['white']} />
                <Ground />
                <OrbitControls />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 30, 10]} castShadow />
                <fog attach="fog" args={["white", 20, 60]} />

                <AESModel position={[0, 1, 0]} vissl={viewLayer} scale={8} />


            </Canvas>

        </View >


    )
}


const styles = StyleSheet.create({

    controllerView: {
        position: 'absolute',
        width: 200,
        backgroundColor: 'white',
        top: 100,
        left: 50,
        padding: 20,
        borderRadius: 10,

        zIndex: 1
    },
    oneLayerControlView: {
        backgroundColor: '#f5f5f5',

    }

})