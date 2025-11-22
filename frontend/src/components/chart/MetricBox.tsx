interface MetricBoxProps {
  title: string,
  value: number,
  isRank?: boolean,
}

function MetricBox({ title, value, isRank = false }: MetricBoxProps) {
  return (
    <div className="metric-box-back">
      <div className={`flex flex-col justify-between metric-box-front pl-3 py-[0.75px]
                       ${isRank ? "text-secondary-2" : "text-white"}`}>
        <p className="text-[10px] text-white">{title}</p>
        <h2 className="text-right -mt-2 text-[36px] pr-4">
          {isRank && "#"} {value}
        </h2>
      </div>
    </div>
  )
}

export default MetricBox;
