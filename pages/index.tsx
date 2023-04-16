import { GetServerSideProps } from "next/types";

import Link from "next/link";

import useSWR from "swr";

const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

export default function Home() {
  return (
    <main>
      <div>
        <div>
          <div className="flex justify-center">
            <div className="w-4/5 lg:w-1/2">
              <h2 className="font-semibold text-lg py-5">Templates</h2>
              <TemplatesChoose />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function TemplatesChoose() {
  const { data, error, isLoading } = useSWR("/api/templates", fetcher);

  if (error)
    return (
      <div className="text-red-500 italic">* Failed to load templates</div>
    );
  if (isLoading) return <div>Loading templates</div>;

  return (
    <table className="table-auto text-left w-full rounded overflow-clip">
      <thead>
        <tr>
          <th className="text-right px-3 py-4 font-semibold border-blue-600 border-y">
            Id
          </th>
          <th className="px-3 py-4 font-semibold border-blue-600 border-y">
            Name
          </th>
          <th className="px-3 py-4 font-semibold border-blue-600 border-y">
            Tag
          </th>
          <th className="px-3 py-4 font-semibold border-blue-600 border-y">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {data.templates.map((template: any) => (
          <tr
            key={template.id}
            className={template.id % 2 != 0 ? "bg-blue-100" : "bg-white"}
          >
            <td className="w-14 text-right px-3 border-blue-600 border-b">
              {template.id}
            </td>
            <td className="px-3 border-blue-600 border-b">{template.name}</td>
            <td className="px-3 border-blue-600 border-b">{template.tag}</td>
            <td className="py-3 w-20 px-3 border-blue-600 border-b">
              <Link href={"/compose/" + template.id}>
                <button className="flex items-center gap-3 bg-white px-3 py-1 outline outline-1 rounded shadow hover:bg-neutral-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <span>Compose</span>
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authorized = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/check"
  ).then((res) => res.status);

  if (authorized != 200) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else
    return {
      props: {},
    };
};
