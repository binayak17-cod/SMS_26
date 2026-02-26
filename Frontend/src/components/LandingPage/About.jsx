import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Example() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const isInView1 = useInView(ref1, { once: true })
  const isInView2 = useInView(ref2, { once: true })
  const isInView3 = useInView(ref3, { once: true })

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-800"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-800/50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <motion.div 
          ref={ref1}
          className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
          initial={{ x: -100, opacity: 0 }}
          animate={isInView1 ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-indigo-400">Student Management System</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                Streamline Your Educational Institution
              </h1>
              <p className="mt-6 text-xl/8 text-gray-300">
                Transform your educational management with our comprehensive student information system. Manage student records, track attendance, handle grades, and facilitate communication all in one platform.
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div 
          ref={ref2}
          className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden"
          initial={{ x: 100, opacity: 0 }}
          animate={isInView2 ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <img
            alt=""
            src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
            className="w-3xl max-w-none rounded-xl bg-gray-800 shadow-xl ring-1 ring-white/10 sm:w-228"
          />
        </motion.div>
        <motion.div 
          ref={ref3}
          className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
          initial={{ x: -100, opacity: 0 }}
          animate={isInView3 ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-400 lg:max-w-lg">
              <p>
                Our comprehensive student management system revolutionizes how educational institutions operate. From enrollment to graduation, we provide tools that streamline administrative tasks, enhance communication between stakeholders, and improve student outcomes through data-driven insights.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-400">
                <li className="flex gap-x-3">
                  <CloudArrowUpIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-400" />
                  <span>
                    <strong className="font-semibold text-white">Cloud-Based Platform.</strong> Access your student data securely from anywhere with our cloud infrastructure. Real-time synchronization ensures all stakeholders have up-to-date information.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <LockClosedIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-400" />
                  <span>
                    <strong className="font-semibold text-white">Secure Data Protection.</strong> Enterprise-grade security with encrypted data storage and FERPA compliance to protect sensitive student information.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ServerIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-400" />
                  <span>
                    <strong className="font-semibold text-white">Automated Backups.</strong> Daily automated backups ensure your student records are never lost, with easy restoration capabilities for peace of mind.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                Experience seamless integration with existing school systems, comprehensive reporting tools, and intuitive interfaces designed for educators, administrators, students, and parents. Our platform grows with your institution's needs.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-white">Ready to Transform Your Institution?</h2>
              <p className="mt-6">
                Join thousands of educational institutions worldwide who trust EduNexus to manage their student information systems. From small schools to large universities, our scalable solution adapts to your unique requirements while maintaining the highest standards of security and performance.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
