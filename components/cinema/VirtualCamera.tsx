'use client';
import { useFrame, useThree } from '@react-three/fiber';
import { useCinema } from '@/store/cinema';
import * as THREE from 'three';

const tmpPos = new THREE.Vector3();
const tmpTar = new THREE.Vector3();
const lookAtMatrix = new THREE.Matrix4();
const lookAtQuat = new THREE.Quaternion();

export function VirtualCamera() {
  const camera = useThree((s) => s.camera);

  useFrame(() => {
    const { cameraPosition, cameraTarget, reducedMotion } = useCinema.getState();
    const lerp = reducedMotion ? 1 : 0.08;
    tmpPos.copy(camera.position).lerp(cameraPosition, lerp);
    camera.position.copy(tmpPos);

    tmpTar.copy(cameraTarget);
    lookAtMatrix.lookAt(camera.position, tmpTar, camera.up);
    lookAtQuat.setFromRotationMatrix(lookAtMatrix);
    camera.quaternion.slerp(lookAtQuat, lerp);
  });

  return null;
}
