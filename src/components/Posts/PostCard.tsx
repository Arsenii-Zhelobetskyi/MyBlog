import { Heart } from 'lucide-react';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { imagePlaceholder } from '@/lib/utils';
function PostCard({
  post,
}: {
  post: {
    id: number;
    cover: string;
    title: string;
    created_at: string;
    likes: number;
  };
}) {
  const navigate = useNavigate();
  const formattedDate = format(new Date(post.created_at), 'MMM dd, yyyy');
  return (
    <div className="flex justify-center">
      <Card
        className="min-h-80 w-72 cursor-pointer bg-background transition-colors hover:bg-accent hover:text-accent-foreground"
        key={post.id}
        onClick={() => navigate(`/post/${post.id}`)}
      >
        <CardHeader>
          <img
            src={post.cover ? post.cover : imagePlaceholder}
            className="h-52 w-full rounded-md object-cover"
          />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <CardTitle className="border-none">{post.title}</CardTitle>
          <p className="break-words text-sm font-medium leading-none">
            small desc
          </p>
          <CardDescription className="flex items-center gap-2">
            <span>{formattedDate}</span>
            <Heart className="h-4 w-4" />
            <span>{post.likes}</span>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

export default PostCard;
