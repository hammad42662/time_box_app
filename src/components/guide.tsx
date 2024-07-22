interface Instructions {
  id: number;
  name: string;
  detail: string;
}
const Instructions: Instructions[] = [
  {
    id: 1,
    name: "Brain Dump",
    detail:
      "These are the tasks you are expecting to complete in the day. Theses tasks includes important and unimportant tasks and will be shown with Orange Background in calendar",
  },
  {
    id: 2,
    name: "Priority Tasks",
    detail:
      "Choose three tasks with highest priority and add it into Priority Tasks. Theses tasks will be shown with Green Background in calendar",
  },
  {
    id: 3,
    name: "Calendar",
    detail:
      "All the braindump and priority tasks will be shown in calendar with different background",
  },
];
export default function Guide() {
  return (
    <div className=" flex flex-col ">
      <h1 className=" text-3xl ">How Time Box App Works?</h1>
      <ul>
        {Instructions.map((instruction) => (
          <li key={instruction.id} className=" text-lg text-zinc-600">
            <b>
              {instruction.id}:{instruction.name}
            </b>
            <p>{instruction.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
