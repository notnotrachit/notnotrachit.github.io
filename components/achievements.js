import Image from "next/image";

export default function AchievementCard({ achievement }) {
  return (
    <div className="backdrop-blur-sm rounded-xl w-full lg:w-[23rem] p-5 flex flex-col gap-4 border-[0.3px] border-primary/50 hover:border-primary/80 transition-all duration-300 hover:scale-105">
      <div className="flex gap-4 items-start">
        <div className="flex-shrink-0">
          <Image
            src={achievement.image}
            alt={achievement.title}
            width={64}
            height={64}
            className="rounded-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xl font-semibold mb-2 leading-tight">
            {achievement.title}
          </div>
          <div className="mb-2">
            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-base font-medium">
              {achievement.award}
            </span>
            {achievement.subAward && (
              <>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-base font-medium">
                  {achievement.subAward}
                </span>
              </>
            )}
          </div>
          {achievement.teammates && achievement.teammates.length > 0 && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Team mates: </span>
              {achievement.teammates.join(", ")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}