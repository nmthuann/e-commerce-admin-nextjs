// import { promises as fs } from "fs"
// import path from "path"
import { Metadata } from "next"
// import Image from "next/image"
// import { z } from "zod"

import { columns } from "@/app/(dashboard)/task/components/coloumns"
import { DataTable } from "./components/data-table"
import { UserNav } from "@/components/user-nav"
// import { Task, taskSchema } from "./data/schema"
import { GetTaskOrders } from "@/actions/order/get-task-order"
// import { faker } from "@faker-js/faker"

// import { labels, priorities, statuses } from "./data/data"
// import { ITask } from "@/types/task.interface"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}




 // JSON.stringify(tasks, null, 2)


// Simulate a database read for tasks.
// get data
// async function getTasks() {
//   // const data = await fs.readFile(
//   //   path.join(process.cwd(), "app/(dashboard)/task/data/tasks.json")
//   // )
//   // const tasks = JSON.parse(data.toString())
//   // return z.array(taskSchema).parse(tasks)

//   // const data: ITask[] = await GetTaskOrders();
  
//   // const oldTasks = Array.from({ length: 100 }, () => ({
//   //   title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
//   //   status: faker.helpers.arrayElement(statuses).value,
//   //   label: faker.helpers.arrayElement(labels).value,
//   //   priority: faker.helpers.arrayElement(priorities).value,
//   // }))

//   // const mergedArray = [...data, ...arr2];

//   // const newTasks = JSON.stringify(data)

//   // console.log(JSON.stringify(newTasks))
//   // const tasks = JSON.parse(JSON.stringify(newTasks))
//   // return z.array(taskSchema).parse(tasks);

// }

export default async function TaskPage() {
 
  //const data = await GetTaskOrders();
  const tasks = await GetTaskOrders();
  console.log(tasks)

  return (
    <>
      {/* <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div> */}
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Task Order Manager</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {/* <UserNav /> */}
          </div>
        </div>
        <DataTable data ={tasks} columns={columns} />
      </div>
    </>
    
  )
}