
'use client'
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { BadgeQuestionMark } from "lucide-react";


interface Step {
  element: string;
  popover: { title: string; description: string };
}

export default function HelpButton({ steps }: { steps: Step[] }) {
  const startTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: steps,
      nextBtnText: 'Próximo',
      prevBtnText: 'Anterior',
      doneBtnText: 'Concluir',
    });
    driverObj.drive();
  };

  return (
    <button
      onClick={startTutorial}
      className="fixed bottom-6 right-6 z-50 p-4 bg-orange-500 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all hover:scale-105"
    >
      <span>
        <BadgeQuestionMark size={20}/>
        Ajuda  
      </span>
    </button>
  );
}