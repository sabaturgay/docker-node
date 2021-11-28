import { CronJob } from 'cron'

import {
  AsyncTask,
  SimpleIntervalJob,
  ToadScheduler,
} from 'toad-scheduler'

const schedulerManager = new ToadScheduler()

let id = 0

export const scheduler = {
  every: (interval: string, callback: () => any) => {
    id += 1
    const task = new AsyncTask(
      `${id}`,
      async () => {
        await callback()
      },
      (err: Error) => { console.error(err) },
    )
    const [intervalCount, intervalUnit] = interval.split(' ')
    const job = new SimpleIntervalJob(
      { [intervalUnit]: Number.parseFloat(intervalCount) },
      task,
    )
    schedulerManager.addSimpleIntervalJob(job)
    return job
  },
  cron: (cron: string, callback: () => any) => {
    id += 1
    const job = new CronJob(cron, callback)
    return job
  },
}
