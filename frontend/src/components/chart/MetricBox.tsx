interface MetricBoxProps {
  title: string,
  value: number
}

function MetricBox({ title, value }: MetricBoxProps) {
  return (
    <div className="metric-box-back">
      <div className="flex flex-col justify-between metric-box-front text-white px-2 pb-1">
        <p className="text-[10px]">{title}</p>
        <h2 className="text-right -mt-2 text-[36px]">{value}</h2>
      </div>
    </div>
  )
}

export default MetricBox;
