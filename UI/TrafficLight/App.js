import TrafficLight from "./TrafficLight";

const config = {
  green: {
    durationMS: 3000,
    announcement: "It's green. You can cross now",
    next: "yellow",
  },
  yellow: {
    durationMS: 500,
    announcement: "It's yellow. Wait a little",
    next: "red",
  },
  red: {
    durationMS: 4000,
    announcement: "It's red. Wait",
    next: "green",
  },
};

export default function App() {
  return (
    <>
      <TrafficLight config={config} />
      <TrafficLight config={config} initialColor="yellow" />
      <TrafficLight config={config} reverse={true} />

      <TrafficLight config={config} variant="horizontal" />

      <TrafficLight config={config} variant="horizontal" reverse="true" />
    </>
  );
}
