import React, { useRef, useState, Suspense, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber/native'
import { useGLTF, Environment, Grid, Stage, useTexture, useFBX } from '@react-three/drei'
import useControls from "r3f-native-orbitcontrols"
import {
    View, Text, StyleSheet, Button
} from 'react-native';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AESModel from './3DViewPageScreens/AES3D';
import AESModel_Select from './3DViewPageScreens/AES3D_Select';


const roomDetails = Object.freeze({

    C11: { pos: [-0.9874718, 0.0651544, -3.1685798], visslLayer: 0 },
    C12: { pos: [-0.6250277, 0.0706644, -3.08796], visslLayer: 0 },
    C13: { pos: [-0.2836982, 0.0706645, -3.0120687], visslLayer: 0 },
    C14: { pos: [0.0545454, 0.0706644, -2.9367959], visslLayer: 0 },
    C15: { pos: [0.7266732, 0.0706645, -2.7872455], visslLayer: 0 },
    C16: { pos: [1.0638076, 0.0706646, -2.7122276], visslLayer: 0 },
    C17: { pos: [1.397139, 0.0706646, -2.6380558], visslLayer: 0 },
    C18: { pos: [1.7430981, 0.0706644, -2.5610197], visslLayer: 0 },
    C21: { pos: [-0.9874718, 0.2828777, -3.1685798], visslLayer: 1 },
    C22: { pos: [-0.6250277, 0.2883877, -3.08796], visslLayer: 1 },
    C23: { pos: [-0.2836982, 0.2883877, -3.0120687], visslLayer: 1 },
    C24: { pos: [0.0545454, 0.2883877, -2.9367959], visslLayer: 1 },
    C25: { pos: [0.7266732, 0.2883877, -2.7872455], visslLayer: 1 },
    C26: { pos: [1.0638076, 0.2883878, -2.7122276], visslLayer: 1 },
    C27: { pos: [1.397139, 0.2883879, -2.6380558], visslLayer: 1 },
    C28: { pos: [1.7430981, 0.2883877, -2.5610197], visslLayer: 1 },
    C31: { pos: [-0.9874718, 0.5004085, -3.1685798], visslLayer: 2 },
    C32: { pos: [-0.6250277, 0.5059185, -3.08796], visslLayer: 2 },
    C33: { pos: [-0.2836982, 0.5059186, -3.0120687], visslLayer: 2 },
    C34: { pos: [0.0545454, 0.5059185, -2.9367959], visslLayer: 2 },
    C35: { pos: [0.7266732, 0.5059186, -2.7872455], visslLayer: 2 },
    C36: { pos: [1.0638076, 0.5059186, -2.7122276], visslLayer: 2 },
    C37: { pos: [1.397139, 0.5059187, -2.6380558], visslLayer: 2 },
    C38: { pos: [1.7430981, 0.5059185, -2.5610197], visslLayer: 2 },
    B504: { pos: [0.9958929, 0.5027511, -0.9924651], visslLayer: 3 },
    B503: { pos: [0.9958929, 0.5027511, -0.3300216], visslLayer: 3 },
    B501: { pos: [0.3565488, 0.5027511, -0.1992079], visslLayer: 3 },
    B402: { pos: [-0.3214126, 0.4026741, -0.6191269], visslLayer: 2 },
    B403: { pos: [-0.2896996, 0.4026741, -0.9617347], visslLayer: 2 },
    B404: { pos: [-0.2896996, 0.4026741, -1.2397499], visslLayer: 2 },
    B304: { pos: [0.9958927, 0.2897463, -1.0866237], visslLayer: 1 },
    B302: { pos: [0.9958927, 0.2897463, -0.2904456], visslLayer: 1 },
    B301: { pos: [0.4404265, 0.2897463, -0.2707966], visslLayer: 1 },
    B201: { pos: [-0.3675849, 0.178829, -0.9050451], visslLayer: 1 },
    B101: { pos: [0.9260171, 0.0706595, -0.2056877], visslLayer: 0 },
    B102: { pos: [1.3941406, 0.0706595, -0.2056877], visslLayer: 0 },
    B103: { pos: [1.4871002, 0.0706595, -0.5342053], visslLayer: 0 },
    B104: { pos: [1.3941402, 0.0706593, -0.8696029], visslLayer: 0 },
    B105: { pos: [1.3941402, 0.0706593, -1.2020868], visslLayer: 0 },
    A101: { pos: [0.4856721, 0.0909141, 1.7966301], visslLayer: 1 },
    A102: { pos: [0.4856721, 0.0909141, 2.1443849], visslLayer: 1 },
    A103: { pos: [0.4856721, 0.0909141, 2.4915569], visslLayer: 1 },
    A104: { pos: [0.4929026, 0.0909141, 3.0153573], visslLayer: 1 },
    A105: { pos: [0.8510993, 0.0909141, 3.0153573], visslLayer: 1 },
    A106: { pos: [1.1993546, 0.0909141, 3.0153573], visslLayer: 1 },
    A107: { pos: [1.5349344, 0.0909141, 3.0153573], visslLayer: 1 },
    A108: { pos: [1.8676444, 0.0909141, 3.0153573], visslLayer: 1 },
    A109: { pos: [1.980903, 0.0909141, 2.2610955], visslLayer: 1 },
    A110: { pos: [1.980903, 0.0909141, 1.9167588], visslLayer: 1 },
    A111: { pos: [2.061739, 0.0909141, 1.508172], visslLayer: 1 },
    A112: { pos: [1.6938344, 0.0909141, 1.4491345], visslLayer: 1 },
    A113: { pos: [1.3030345, 0.0909141, 1.4491345], visslLayer: 1 },
    A204: { pos: [0.4909991, 0.2725604, 3.0153575], visslLayer: 2 },
    A205: { pos: [0.8560672, 0.2725604, 3.0153575], visslLayer: 2 },
    A206: { pos: [1.2378983, 0.2725604, 3.0153575], visslLayer: 2 },
    A207: { pos: [1.5604262, 0.2725604, 3.0153575], visslLayer: 2 },
    A208: { pos: [1.861464, 0.2725604, 3.0153575], visslLayer: 2 },
    A209: { pos: [1.9778247, 0.2725604, 2.2605011], visslLayer: 2 },
    A210: { pos: [1.9778247, 0.2725604, 1.9163648], visslLayer: 2 },


})





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

const CameraAnimation = ({ pos }) => {

    const state = useThree()

    const [started, setStarted] = useState(false)
    const vec = new THREE.Vector3();

    useEffect(() => {
        setStarted(true);
    });

    useFrame(state => {
        if (started) {
            state.camera.lookAt(pos[0] * 8, pos[1] * 8, pos[2] * 8);
            state.camera.position.lerp(vec.set(pos[0] * 8, pos[1] * 8 + 7, pos[2] * 8), .005)
        } return null
    })
    return null;
}




export default function Interactive3DPage({ navigation, route }) {

    let params

    if (route.params != undefined) {
        params = route.params
    }


    const [viewLayer, setViewLayer] = useState([true, true, true, true, true])
    const [OrbitControls, events] = useControls()

    let camera = new THREE.PerspectiveCamera(90, 1.5, 0.1, 1000);
    let [x, y, z] = [-25, 30, 0];
    camera.position.set(x, y, z);

    const [state, setState] = useState(5)

    let a

    if (route.params != undefined) {
        a = new THREE.Vector3(roomDetails[params.selectedRooms[0]].pos[0] * 8, roomDetails[params.selectedRooms[0]].pos[1] * 8, roomDetails[params.selectedRooms[0]].pos[2] * 8);

        useEffect(() => {

            setState(roomDetails[params.selectedRooms[0]].visslLayer)

            switch (roomDetails[params.selectedRooms[0]].visslLayer) {
                case 0:
                    setViewLayer([true, false, false, false, false, false])
                    break;
                case 1:
                    setViewLayer([true, true, false, false, false, false])
                    break;
                case 2:
                    setViewLayer([true, true, true, false, false, false])
                    break;
                case 3:
                    setViewLayer([true, true, true, true, false, false])
                    break;
                case 4:
                    setViewLayer([true, true, true, true, true, false])
                    break;
                case 5:
                    setViewLayer([true, true, true, true, true, true])
                    break;



                default:
                    break;
            }
        }, [])
    }







    //
    return (

        <View {...events} style={{ flex: 1 }}>

            {
                (route.params != undefined) ?
                    <View style={styles.legendeView}>
                        <Text style={styles.legendeViewText}>
                            MARKIERTER RAUM:
                        </Text>
                        <Text style={styles.legendeViewTextROOM}>
                            {route.params.selectedRooms}
                        </Text>
                        <Ionicons name={'cube'} size={20} color={'#ff4a4a'} />
                    </View> :
                    <></>

            }


            <Canvas camera={camera} >
                <color attach="background" args={['white']} />
                <Ground />
                {
                    (route.params != undefined) ?
                        <OrbitControls target={a} enableZoom={false} /> :
                        <OrbitControls />

                }
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[10, 50, 10]}
                    castShadow

                />
                {
                    (route.params != undefined) ?
                        <CameraAnimation pos={roomDetails[params.selectedRooms[0]].pos} /> :
                        <></>

                }
                <fog attach="fog" args={["white", 40, 60]} />

                {
                    (route.params != undefined) ?
                        <AESModel_Select position={[0, 0.015, 0]} scale={8} vissl={viewLayer} roomDetails={roomDetails[params.selectedRooms[0]]} selectedRoom={params.selectedRooms[0]} /> :
                        <></>
                }

                <AESModel position={[0, 0.015, 0]} vissl={viewLayer} scale={8} />


            </Canvas>

            <View>
                <View style={styles.ebenenVisView}>
                    <Text style={styles.ebenenVisViewText}>SICHTBARE EBENEN</Text>
                </View>
                <SegmentedControl

                    values={['0', '1', '2', '3', '4', '5']}
                    selectedIndex={state}
                    onChange={(event) => {
                        setState(event.nativeEvent.selectedSegmentIndex);
                        switch (event.nativeEvent.selectedSegmentIndex) {
                            case 0:
                                setViewLayer([true, false, false, false, false, false])
                                break;
                            case 1:
                                setViewLayer([true, true, false, false, false, false])
                                break;
                            case 2:
                                setViewLayer([true, true, true, false, false, false])
                                break;
                            case 3:
                                setViewLayer([true, true, true, true, false, false])
                                break;
                            case 4:
                                setViewLayer([true, true, true, true, true, false])
                                break;
                            case 5:
                                setViewLayer([true, true, true, true, true, true])
                                break;

                            default:
                                break;
                        }

                    }}
                />
            </View>

        </View >


    )
}


const styles = StyleSheet.create({
    wrapper: {
    },

    ebenenVisView: {
        borderRadius: 10,
        padding: 10,
        borderColor: '#dadae8',
        borderWidth: 0.5,
        borderRadius: 10,
    },

    ebenenVisViewText: {
        color: 'grey',
        fontSize: 10,
        fontWeight: '600',

    },



    legendeView: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',

        borderColor: '#dadae8',
        borderWidth: 0.5,
    },
    legendeViewText: {
        fontWeight: '800',
        color: 'grey',
    },
    legendeViewTextROOM: {
        fontSize: 20,
        fontWeight: '800',
        marginHorizontal: 10,
        paddingBottom: 2
    }

})