import { useParams } from 'react-router-dom';
import CalculatorWithSnaps from '../SnapsCalculator/CalculatorWithSnaps';

const CalculatedPage = () => {
  const { goal } = useParams();
  
  return (
    <CalculatorWithSnaps initialGoal={goal}/>
  );
};

export default CalculatedPage;
