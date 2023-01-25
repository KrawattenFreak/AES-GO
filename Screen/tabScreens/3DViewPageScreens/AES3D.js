import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";


import modelPath from '../../../assets/3D/AESLowPolyREADY.glb'


export default function AESModel(props) {

    const { scene, nodes } = useGLTF(modelPath)



    return (

        <group {...props} dispose={null}>
            <mesh
                geometry={nodes.B0VIEW_GROUND.geometry}
                visible={props.vissl[0]}
                position={[0.89599556, -0.03261101, -0.72179472]}

                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='#4a536b' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.B0VIEW_WALL.geometry}
                visible={props.vissl[0]}
                position={[0.6508801, -0.20662537, -0.15485185]}
                rotation={[-Math.PI / 2, 1.6e-7, Math.PI]}
                scale={0.3084814}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='white' attach={'material'} />
            </mesh>


            <mesh
                geometry={nodes.B1VIEW_GROUND.geometry}
                visible={props.vissl[1]}
                position={[0.72975183, 0.15484335, -0.84147084]}
                scale={0.41387427}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='#4a536b' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.B1VIEW_WALL.geometry}
                visible={props.vissl[1]}
                position={[0.23194438, 0.21283308, -0.56684208]}
                rotation={[0, 0, Math.PI / 2]}
                scale={[0.416168, 0.41616762, 0.41616762]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='white' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.B2VIEW_GROUND.geometry}
                visible={props.vissl[2]}
                position={[0.03989714, 0.30015048, -0.89777178]}
                scale={0.416168}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='#4a536b' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.B2VIEW_WALL.geometry}
                visible={props.vissl[2]}
                position={[0.27937526, 0.44776681, -0.61857009]}
                rotation={[0, 0, Math.PI / 2]}
                scale={[0.416168, 0.41616762, 0.41616762]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='white' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.B3VIEW_GROUND.geometry}
                visible={props.vissl[3]}
                position={[0.77186459, 0.41106778, -0.69282186]}
                scale={0.416168}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='#4a536b' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.B3VIEW_WALL.geometry}
                visible={props.vissl[3]}
                position={[0.62756157, 0.50977385, -0.4911271]}
                rotation={[0, 0, -Math.PI / 2]}
                scale={0.32955599}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='white' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.B4VIEW_WALL.geometry}
                visible={props.vissl[4]}
                position={[0.45387775, 0.65171778, -0.74444979]}
                rotation={[0, 0, -Math.PI / 2]}
                scale={0.32955599}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='white' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.B4VIEW_GROUND.geometry}
                visible={props.vissl[4]}
                position={[0.45387775, 0.65171778, -0.74444979]}
                rotation={[0, 0, -Math.PI / 2]}
                scale={0.32955599}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='#4a536b' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.B_DACH.geometry}
                visible={props.vissl[5]}
                position={[-0.0636304, 0.52646428, -0.80294013]}
                scale={0.416168}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='white' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.A1VIEW_WALL.geometry}
                visible={props.vissl[1]}
                position={[1.18326402, 0.19573787, 2.22143793]}
                rotation={[Math.PI / 2, 0, 0]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='white' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.A1VIEW_GROUND.geometry}
                visible={props.vissl[1]}
                position={[1.26783776, 0.00759108, 2.22578955]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='#4a536b' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.A2VIEW_GROUND.geometry}
                visible={props.vissl[2]}
                position={[1.26783776, 0.18923731, 2.22578955]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='#4a536b' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.A2VIEW_WALL.geometry}
                visible={props.vissl[2]}
                position={[1.92458487, 0.04986289, 2.77998209]}
                rotation={[0, 0, -Math.PI / 2]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='white' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.A_DACH.geometry}
                visible={props.vissl[3]}
                position={[1.26783776, 0.37088341, 2.22578955]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='white' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.ÜbergangWand.geometry}
                visible={props.vissl[3]}
                position={[0.77246952, 0.13614181, 0.59961736]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='white' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.C1VIEW_WALL.geometry}
                visible={props.vissl[0]}
                position={[0.3406927, 0.09206477, -2.72230172]}
                rotation={[Math.PI / 2, -1.6e-7, Math.PI]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='white' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.C1VIEW_GROUND.geometry}
                visible={props.vissl[0]}
                position={[0.77246958, -0.03260101, -2.74140406]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='#4a536b' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.C2VIEW_WALL.geometry}
                visible={props.vissl[1]}
                position={[0.77246958, 0.18512234, -2.74140406]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='white' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.C2VIEW_GROUND.geometry}
                visible={props.vissl[1]}
                position={[0.77246958, 0.18512234, -2.74140406]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='#4a536b' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.C3VIEW_GROUND.geometry}
                visible={props.vissl[2]}
                position={[0.77246958, 0.40265322, -2.74140406]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='#4a536b' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.C3VIEW_WALL.geometry}
                visible={props.vissl[2]}
                position={[0.18902993, 0.5417763, -2.51327109]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='white' attach={'material'} />
            </mesh>
            <mesh
                geometry={nodes.C_DACH.geometry}
                visible={props.vissl[3]}
                position={[0.95030069, 0.63870949, -2.63405609]}
                rotation={[0, 1.36361825, 0]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial castShadow color='white' attach={'material'} />
            </mesh>
        </group>

    )

}
