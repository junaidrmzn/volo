# Old Time Scheduler
The time scheduler component got pretty unstable over the course of the last year.
We're in the process of stabilizing the time scheduler again based on this decision: https://github.com/volocopter-internal/architecture-decision-records/blob/main/docs/network-schedule-planning/20240313-time-scheduler-architecture.md

The `/old` subfolder contains a copy of the status quo of the time scheduler and all other folders contain the new version of the time scheduler that is going to be subject to a lot of fixes.
As those fixes might - in the first step - render some features of the time scheduler completely broken, we'll feature toggle the time scheduler and thus maintain two different version at the same time.
As soon as the new version is on par again with the old version, we'll replace the old version with the new version and remove the duplicated code.