import { Line, LineChart, Tooltip, XAxis } from 'recharts';
import type { ExecutiveData } from '../../../types/executive';

function Chart1({ chart1 }: ExecutiveData) {
  let data = chart1;

  return (
    <div className='relative'>
      <LineChart style={{ height: '100%', aspectRatio: 1.618, maxHeight: 400 }} responsive data={data}>
        <Line dataKey="titleCount" />
        <XAxis dataKey="yearAired" />
        <Tooltip />
      </LineChart>
    </div>
  );
}

export default Chart1
