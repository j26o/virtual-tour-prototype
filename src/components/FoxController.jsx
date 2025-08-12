import Ecctrl, { EcctrlAnimation } from 'ecctrl'
import { Fox } from './Fox'



export const FoxController = () => {
	const characterURL = "/models/fox.gltf"
	const animationSet = {
		idle: "Survey",
		walk: "Walk",
		run: "Run",
		jump: "Run",
		jumpIdle: "Run",
		jumpLand: "Run",
		fall: "Run",
		action1: "",
		action2: "",
		action3: "",
		action4: "", // This is special action which can be trigger while walking or running
		//additinalAnimation: "additinalAnimationName",
	}

  return (
		<Ecctrl
			mode='FixedCamera'
			animated
			
			camInitDis={-12}
			camMaxDis={-18}
			camFollowMult={1}
			camLerpMult={20}
			fixedCamRotMult={0.8}
			
			capsuleRadius={0.35}
			capsuleHalfHeight={0.5}
			
			moveImpulsePointY={0}
		>
			<EcctrlAnimation
				characterURL={characterURL}
				animationSet={animationSet} 
			>
				<Fox />
			</EcctrlAnimation>
		</Ecctrl>
  );
};