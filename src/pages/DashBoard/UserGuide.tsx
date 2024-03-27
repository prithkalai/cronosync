import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  className?: string;
}

const UserGuide = ({ className }: Props) => {
  return (
    <div className={className}>
      <Card className="min-w-[310px] shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">User Guide</CardTitle>
          <CardDescription>
            Please read this guide before using the app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full flex flex-col gap-5">
            <div>
              This app is designed to keep track of "Repetitive Tasks".
              <br />
              It is NOT your regular Todo list app.
              <CardDescription className="mt-2">
                {" "}
                eg: Oil Hair every 3 days, Wash Bed Sheets every 3 months.{" "}
              </CardDescription>
            </div>

            <div>
              You can add tasks or categories using the menu icon in the bottom
              right of the screen.
            </div>
            <div>
              Categories can also be deleted in the same menu. When you delete a
              category, all tasks under that category become uncategorized.
            </div>

            <div>
              While optional, it is recommended to add Categories as they help
              segregate your tasks into various sections for ease of viewing.
            </div>
            <div>
              When the duration of a task is completed, you will be reminded via
              email and on the app.
            </div>
            <div>Happy Scheduling!</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserGuide;
