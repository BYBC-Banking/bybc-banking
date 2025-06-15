
import React from 'react';
import { Lesson } from "@/data/topicsData";

interface VideoPlayerProps {
  lesson: Lesson;
}

const VideoPlayer = ({ lesson }: VideoPlayerProps) => {
  return (
    <div className="space-y-4">
      <div className="aspect-video">
        <iframe
          src={lesson.videoUrl}
          title={lesson.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        ></iframe>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
        <p className="text-muted-foreground">Duration: {lesson.duration}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
