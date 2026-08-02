import {
  Line
} from "react-chartjs-2";

function SubjectPerformanceChart({
  data,
}) {
  return (
    <Line
      data={{
        labels: data.map(
          (d) => d.exam
        ),

        datasets: [
          {
            label:
              "Marks",

            data: data.map(
              (d) => d.marks
            ),
          },
        ],
      }}
    />
  );
}

export default
  SubjectPerformanceChart;