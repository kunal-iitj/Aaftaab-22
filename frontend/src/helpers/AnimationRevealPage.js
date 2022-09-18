import React from "react";
import tw from "twin.macro";

/* framer-motion and useInView here are used to animate the sections in when we reach them in the viewport
 */
import { motion } from "framer-motion";
import useInView from "@owaiswiz/use-in-view";

const StyledDiv = tw.div`font-display min-h-screen text-secondary-500 px-1 py-8 sm:px-4 lg:px-8 bg-img1 overflow-hidden`;
function AnimationReveal({ disabled, children }) {
  if (disabled) {
    return <>{children}</>;
  }

  if (!Array.isArray(children)) children = [children];

  const directions = ["left", "right"];
  const childrenWithAnimation = children.map((child, i) => {
    if ((i == 0) || (i == children.length - 1)) {
      return (
        <>{child}</>
      );
    }
    return (
      <AnimatedSlideInComponent key={i} direction={directions[(i+1) % directions.length]}>
        {child}
      </AnimatedSlideInComponent>
    );
  });
  return <>{childrenWithAnimation}</>;
}

function AnimatedSlideInComponent({ direction = "left", offset = 30, children }) {
  const [ref, inView] = useInView(30);

  const x = { target: "0%" };

  if (direction === "left") x.initial = "-150%";
  else x.initial = "150%";

  return (
    <motion.section
      initial={{ x: x.initial }}
      animate={{ 
        x: inView && x.target,
        transitionEnd:{
          x: inView && 0
        }
      }}
      transition={{ type: "spring", damping: 19 }}
      ref={ref}
    >
      {children}
    </motion.section>
  );
}

export default props => (
  <StyledDiv className="App">
    <AnimationReveal {...props} />
  </StyledDiv>
);
