import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const SlotMachine = ({ results, isSpinning, spinId }) => {
  if (results.length === 0 && !isSpinning) return null;

  return (
    <div className="slot-machine-container">
      {results.map((result, index) => (
        <Slot key={`${spinId}-${index}`} targetName={result} isSpinning={isSpinning} delay={index * 0.2} />
      ))}
    </div>
  );
};

const Slot = ({ targetName, isSpinning, delay }) => {
  const controls = useAnimation();
  const [displayNames, setDisplayNames] = useState([]);

  // Generate random names for the spinning effect
  useEffect(() => {
    const dummyNames = ['김철수', '이영희', '박지민', '최동수', '정하나', '강하늘', '조수빈', '윤보미', targetName];
    // Create a long list for continuous spinning
    let longList = [];
    for(let i=0; i<10; i++) {
      longList = longList.concat(dummyNames.sort(() => 0.5 - Math.random()));
    }
    // Make sure the target is at the very end
    longList.push(targetName);
    setDisplayNames(longList);
  }, [targetName]);

  useEffect(() => {
    if (isSpinning) {
      // 150px is the height of one slot item
      const itemHeight = 150;
      const totalDistance = -(displayNames.length - 1) * itemHeight;

      controls.start({
        y: [0, totalDistance],
        transition: {
          duration: 3 + delay,
          ease: "circOut", // Fast start, slow end
        }
      });
    } else {
      controls.set({ y: 0 });
      setDisplayNames([targetName]);
    }
  }, [isSpinning, controls, displayNames.length, delay, targetName]);

  return (
    <div className="slot">
      <motion.div 
        className="slot-inner"
        animate={controls}
        initial={{ y: 0 }}
      >
        {displayNames.map((name, i) => (
          <div key={i} className="slot-item">
            {name}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SlotMachine;
