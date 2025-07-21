import Image from "next/image";
import { FaClock, FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa";

export default function BlogCard(props) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="group card bg-base-100 shadow-xl border border-primary/20 hover:border-primary/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full">
      {/* Cover Image */}
      <figure className="relative overflow-hidden">
        <Image
          src={props.cover_image || `https://render.duply.co/query/4fTjAk0l7efwnMR/image.jpg?title=${encodeURIComponent(props.title)}`}
          alt={props.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          width={400}
          height={200}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </figure>

      {/* Card Content */}
      <div className="card-body p-6 flex flex-col justify-between flex-grow">
        {/* Tags */}
        {props.tag_list && props.tag_list.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {props.tag_list.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="badge badge-primary badge-sm text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="card-title text-lg font-bold leading-tight mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {props.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
          {props.description || "Click to read this interesting article..."}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          {props.published_at && (
            <div className="flex items-center gap-1">
              <FaCalendarAlt className="text-primary" />
              <span>{formatDate(props.published_at)}</span>
            </div>
          )}
          {props.reading_time_minutes && (
            <div className="flex items-center gap-1">
              <FaClock className="text-primary" />
              <span>{props.reading_time_minutes} min read</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="card-actions justify-end">
          <a 
            href={props.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm gap-2 hover:gap-3 transition-all duration-300"
          >
            Read Article
            <FaExternalLinkAlt className="text-xs" />
          </a>
        </div>
      </div>
    </div>
  );
}
