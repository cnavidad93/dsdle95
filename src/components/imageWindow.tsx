import ImageMagnifier from "./imageMagnifier";
import Card, { CardContent, CardHeader } from "./ui/card";

export default function ImageWindow({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl?: string;
}) {
  return (
    <Card
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CardHeader withActions>
        <span className="text-xl">{title}</span>
      </CardHeader>
      <CardContent>
        <div className="h-[203px] w-[400px]">
          {imageUrl && (
            <ImageMagnifier
              src={imageUrl}
              alt="Boss"
              width={400}
              height={203}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
