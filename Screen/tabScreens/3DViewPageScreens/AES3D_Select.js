import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";


import modelPath from '../../../assets/3D/AESLowPolyREADY.glb'






export default function AESModel_Select(props) {
    let rooms = {
        C11: false,
        C12: false,
        C13: false,
        C14: false,
        C15: false,
        C16: false,
        C17: false,
        C18: false,
        C21: false,
        C22: false,
        C23: false,
        C24: false,
        C25: false,
        C26: false,
        C27: false,
        C28: false,
        C31: false,
        C32: false,
        C33: false,
        C34: false,
        C35: false,
        C36: false,
        C37: false,
        C38: false,
        B504: false,
        B503: false,
        B501: false,
        B402: false,
        B403: false,
        B404: false,
        B304: false,
        B302: false,
        B301: false,
        B201: false,
        B101: false,
        B102: false,
        B103: false,
        B104: false,
        B105: false,
        A101: false,
        A102: false,
        A103: false,
        A104: false,
        A105: false,
        A106: false,
        A107: false,
        A108: false,
        A109: false,
        A110: false,
        A111: false,
        A112: false,
        A113: false,
        A204: false,
        A205: false,
        A206: false,
        A207: false,
        A208: false,
        A209: false,
        A210: false,
    }

    const { scene, nodes } = useGLTF(modelPath)

    if (props.selectedRoom) {

        rooms[props.selectedRoom] = true

    }




    return (

        <group {...props} dispose={null}>

            <mesh
                castShadow
                receiveShadow
                geometry={nodes[props.selectedRoom].geometry}
                visible={rooms[props.selectedRoom] && props.vissl[props.roomDetails.visslLayer]}

                position={props.roomDetails.pos}
            >
                <meshBasicMaterial castShadow color='red' opacity={0.4} transparent attach={'material'} />
            </mesh>




        </group>


    )

}
