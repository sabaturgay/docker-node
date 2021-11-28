import { ToadScheduler, SimpleIntervalJob, AsyncTask } from 'toad-scheduler'
import { CronJob } from 'cron'
const schedulerManager = new ToadScheduler()

let id = 0

export const scheduler  = {
  every: (interval: string, callback: () => any) => {
    id += 1
    const task = new AsyncTask(
      `${id}`, 
      callback,
      (err: Error) => { console.error(err) }
  )
  const [intervalCount, intervalUnit] = interval.split(' ')
  const job = new SimpleIntervalJob(
    { [intervalUnit]: intervalCount },
     task
     )
  schedulerManager.addSimpleIntervalJob(job)
  },
  cron: (cron: string, callback: () => any) => {
    id += 1
    const job = new CronJob(cron, callback)
  }
}