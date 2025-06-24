import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

const colorMap = {
  red: 'red', blue: 'blue', green: 'green', yellow: 'yellow',
  purple: 'purple', pink: 'pink', indigo: 'indigo'
}

const Tasks = () => {
  const { tasks, updateTask } = useContext(GlobalContext)

  const getColor = (label) => colorMap[label] || 'blue'

  const toggleTask = (label, checked) => {
    updateTask({ label, checked: !checked })
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-500">
        <p className="text-lg font-semibold">No Labels</p>
        <p className="text-sm mt-2">Start by adding a label.</p>
      </div>
    )
  }

  return (
    <div className="mt-10 space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">
        Labels ({tasks.length})
      </h3>

      {tasks.map(({ label, checked }, idx) => {
        const color = getColor(label)

        return (
          <div
            key={`${label}-${idx}`}
            className={`flex items-center justify-between p-3 rounded-full border-2 transition-all
              bg-${color}-50 cursor-pointer border-${color}-200 hover:bg-${color}-200 hover:border-${color}-300
              ${checked ? 'opacity-70' : ''}
            `}
          >
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleTask(label, checked)}
                className={`h-5 w-5 text-${color}-500 rounded border-${color}-300 focus:ring-${color}-300`}
              />
              <span className={`capitalize font-medium transition-all ${checked ? 'text-gray-400 ' : 'text-gray-800'}`}>
                {label}
              </span>
            </label>

          </div>
        )
      })}
    </div>
  )
}

export default Tasks
