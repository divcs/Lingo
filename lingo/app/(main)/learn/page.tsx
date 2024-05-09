// --------------------------------------------- original

import { FeedWrapper } from '@/components/feed-wrapper'
import { UserProgress } from '@/components/user-progress'
import { StickyWrapper } from '@/components/sticky-wrapper'
import { Header } from './header'
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from '@/db/queries'
import { redirect } from 'next/navigation'
import { Unit } from './unit'
import { lessons, units as unitsSchema } from '@/db/schema'

const LearnPage = async () => {
  const userProgressData = getUserProgress()
  const courseProgressData = getCourseProgress()
  const lessonPercentageData = getLessonPercentage()
  const unitsData = getUnits()

  const [userProgress, units, courseProgress, lessonPercentage] =
    await Promise.all([
      userProgressData,
      unitsData,
      courseProgressData,
      lessonPercentageData,
    ])

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses')
  }
  if (!courseProgress) {
    redirect('/courses')
  }

  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>

      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className='mb-10'>
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={
                courseProgress?.activeLesson as
                  | (typeof lessons.$inferSelect & {
                      unit: typeof unitsSchema.$inferSelect
                    })
                  | undefined
              }
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}
export default LearnPage

// --------------------------------------------- edited

// import { FeedWrapper } from '@/components/feed-wrapper'
// import { UserProgress } from '@/components/user-progress'
// import { StickyWrapper } from '@/components/sticky-wrapper'
// import { Header } from './header'
// import { getUnits, getUserProgress } from '@/db/queries'
// import { redirect } from 'next/navigation'
// import { Unit } from './unit'

// const LearnPage = async () => {
//   const userProgressData = getUserProgress()
//   const unitsData = getUnits()

//   // Await for the results before proceeding
//   const [userProgress, units] = await Promise.all([userProgressData, unitsData])

//   if (!userProgress || !userProgress.activeCourse) {
//     redirect('/courses')
//   }

//   return (
//     <div className='flex flex-row-reverse gap-[48px] px-6'>
//       <StickyWrapper>
//         <UserProgress
//           activeCourse={userProgress.activeCourse}
//           hearts={userProgress.hearts}
//           points={userProgress.points}
//           hasActiveSubscription={false}
//         />
//       </StickyWrapper>

//       <FeedWrapper>
//         <Header title={userProgress.activeCourse.title} />
//         {units.map((unit) => (
//           <div key={unit.id} className='mb-10'>
//             <Unit
//               id={unit.id}
//               order={unit.order}
//               description={unit.description}
//               title={unit.title}
//               lessons={unit.lessons}
//               activeLesson={undefined}
//               activeLessonPercentage={0}
//             />
//           </div>
//         ))}
//       </FeedWrapper>
//     </div>
//   )
// }
// export default LearnPage

// ---------------------------------------------- edited for promise and await

// import { FeedWrapper } from '@/components/feed-wrapper'
// import { UserProgress } from '@/components/user-progress'
// import { StickyWrapper } from '@/components/sticky-wrapper'
// import { Header } from './header'
// import { getUnits, getUserProgress } from '@/db/queries'
// import { redirect } from 'next/navigation'
// import { Unit } from './unit'

// const LearnPage = async () => {
//   // Fetch user progress and units data asynchronously
//   const userProgressPromise = getUserProgress()
//   const unitsPromise = getUnits()

//   try {
//     // Wait for both promises to resolve
//     const [userProgress, units] = await Promise.all([
//       userProgressPromise,
//       unitsPromise,
//     ])

//     if (!userProgress || !userProgress.activeCourse) {
//       redirect('/courses') // Redirect if user progress is not available or no active course
//     }

//     return (
//       <div className='flex flex-row-reverse gap-[48px] px-6'>
//         <StickyWrapper>
//           <UserProgress
//             activeCourse={userProgress.activeCourse}
//             hearts={userProgress.hearts}
//             points={userProgress.points}
//             hasActiveSubscription={false}
//           />
//         </StickyWrapper>

//         <FeedWrapper>
//           <Header title={userProgress.activeCourse.title} />
//           {units.map((unit) => (
//             <div key={unit.id} className='mb-10'>
//               <Unit
//                 id={unit.id}
//                 order={unit.order}
//                 description={unit.description}
//                 title={unit.title}
//                 lessons={unit.lessons}
//                 activeLesson={undefined}
//                 activeLessonPercentage={0}
//               />
//             </div>
//           ))}
//         </FeedWrapper>
//       </div>
//     )
//   } catch (error) {
//     console.error('Error fetching user progress or units:', error)
//     // Handle error gracefully, maybe show a message to the user
//     return <div>Error fetching data. Please try again later.</div>
//   }
// }

// export default LearnPage
