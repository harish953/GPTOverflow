import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/LocalSearch";
import NoResults from "@/components/shared/NoResults";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/shared/homeFilter/HomeFilter";
import { HomePageFilters } from "@/constants/filters";
// import { Item } from "@radix-ui/react-menubar";
import Link from "next/link";

export default function Home() {
  const questions = [
    {
      _id: "1",
      title: "Best practices for data fetching in Next.js",
      tags: [
        { _id: "1", name: "Next.js" },
        { _id: "2", name: "React" },
      ],
      author: {
        _id: "user1",
        name: "John Doe",
        picture: "john-doe.jpg",
      },
      upvotes: 10,
      views: 152,
      answers: [
        {
          _id: "answer1",
          content: "Use SWR for data fetching.",
          author: {
            _id: "user2",
            name: "Jane Smith",
            picture: "jane-smith.jpg",
          },
          createdAt: new Date("2021-09-02T09:30:00Z"),
        },
      ],
      createdAt: new Date("2021-09-01T12:00:00Z"),
    },
    {
      _id: "2",
      title: "Optimizing images in Next.js",
      tags: [
        { _id: "3", name: "Next.js" },
        { _id: "4", name: "Image Optimization" },
      ],
      author: {
        _id: "user2",
        name: "Jane Smith",
        picture: "jane-smith.jpg",
      },
      upvotes: 8567857,
      views: 8898708,
      answers: [
        {
          _id: "answer2",
          content: "Use the 'next/image' component for image optimization.",
          author: {
            _id: "user1",
            name: "John Doe",
            picture: "john-doe.jpg",
          },
          createdAt: new Date("2021-09-02T10:15:00Z"),
        },
        {
          _id: "answer3",
          content: "Consider using a CDN for images.",
          author: {
            _id: "user3",
            name: "Alice Johnson",
            picture: "alice-johnson.jpg",
          },
          createdAt: new Date("2021-09-02T10:30:00Z"),
        },
      ],
      createdAt: new Date("2021-09-02T08:45:00Z"),
    },
    {
      _id: "3",
      title: "State management in React applications",
      tags: [
        { _id: "5", name: "React" },
        { _id: "6", name: "Redux" },
      ],
      author: {
        _id: "user3",
        name: "Alice Johnson",
        picture: "alice-johnson.jpg",
      },
      upvotes: 12,
      views: 110,
      answers: [],
      createdAt: new Date("2021-09-03T10:00:00Z"),
    },
  ];

  // Now the `questions` array matches the `QuestionProps` interface with random values.

  return (
    <>
      <div>
        <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center ">
          <h1 className="h1-bold text-dark100_light900 font-medium">
            All Questions
          </h1>
          <Link href="/questions" className="flex justify-end max-sm:w-full">
            <button className="  primary-gradient min-h-[46px]  rounded-lg px-4 py-3 text-light-900">
              Ask Question
            </button>
          </Link>
        </div>

        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center lg:flex-col">
          <LocalSearch
            route="/"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search for questions"
            otherClasses="flex-1 w-full"
          />{" "}
          <Filter
            filters={HomePageFilters}
            containerClasses="hidden max-md:flex"
            otherClasses="min-h-[56px] sm:min-w-[176px]"
          />
        </div>
        <HomeFilter />
        <div className="mt-10 flex w-full flex-col gap-6">
          {questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCard
                key={question._id}
                title={question.title}
                _id={question._id}
                tags={question.tags}
                author={question.author}
                answers={question.answers}
                views={question.views}
                upvotes={question.upvotes}
                createdAt={question.createdAt}
              />
            ))
          ) : (
            <NoResults
              title="There is no question to show"
              description=" Be the first to break the silence! 🚀Ask question and kickstart the
            discussion.our query could be the next big thing others can learn from.
            Get involved"
              link="/ask-question"
              linkTitle="Ask a Question"
            />
          )}
        </div>
        {/* <QuestionCard /> */}
      </div>
    </>
  );
}
