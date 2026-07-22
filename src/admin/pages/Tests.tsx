import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";

import AdminLayout from "../layouts/AdminLayout";
// @ts-ignore: some table files export differently; ignore module type checking here
import TestTable from "../components/tables/TestTable";

import { useTests } from "../hooks/useTests";

export default function Tests() {
    const navigate = useNavigate();
  const {
    loading,
    tests,
    subjects,
    chapters,
    topics,
    addTest,
    updateTest,
    deleteTest,
  } = useTests();

  const [search, setSearch] = useState("");

  const [selectedSubject, setSelectedSubject] =
    useState("All");

  const [selectedClass, setSelectedClass] =
    useState("All");

  const [selectedStatus, setSelectedStatus] =
    useState("All");

  const subjectOptions = useMemo(
    () => [
      "All",
      ...subjects.map((subject) => subject.name),
    ],
    [subjects]
  );

  const statusOptions = [
    "All",
    "Active",
    "Inactive",
  ];

  const filteredTests = useMemo(() => {
    return tests.filter((test) => {

      const matchesSearch =
        test.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesSubject =
        selectedSubject === "All" ||
        test.subjects?.name === selectedSubject;

      const matchesClass =
        selectedClass === "All" ||
        test.class.toString() === selectedClass;

      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Active"
          ? test.is_active
          : !test.is_active);

      return (
        matchesSearch &&
        matchesSubject &&
        matchesClass &&
        matchesStatus
      );
    });
  }, [
    tests,
    search,
    selectedSubject,
    selectedClass,
    selectedStatus,
  ]);

  return (
    <AdminLayout title="Test Manager">

      <div className="space-y-6">

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          {/* Filters */}

          <div className="flex flex-1 flex-col md:flex-row gap-4">

            {/* Search */}

            <div className="relative flex-1">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search tests..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 outline-none focus:border-teal-500"
              />

            </div>

            {/* Subject */}

            <select
              value={selectedSubject}
              onChange={(e) =>
                setSelectedSubject(e.target.value)
              }
              className="h-12 w-full md:w-52 rounded-xl border border-slate-300 bg-white px-4"
            >
              {subjectOptions.map((subject) => (
                <option
                  key={subject}
                  value={subject}
                >
                  {subject}
                </option>
              ))}
            </select>

            {/* Class */}

            <select
              value={selectedClass}
              onChange={(e) =>
                setSelectedClass(e.target.value)
              }
              className="h-12 w-full md:w-40 rounded-xl border border-slate-300 bg-white px-4"
            >
              <option value="All">
                All Classes
              </option>

              <option value="11">
                Class 11
              </option>

              <option value="12">
                Class 12
              </option>
            </select>

            {/* Status */}

            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value)
              }
              className="h-12 w-full md:w-44 rounded-xl border border-slate-300 bg-white px-4"
            >
              {statusOptions.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>

          </div>

          {/* Add Button */}

          <button
            onClick={() => navigate("/admin/tests/new")}
            className="h-12 rounded-xl bg-teal-500 px-6 text-white font-semibold hover:bg-teal-600 transition flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Test
          </button>

        </div>

       <TestTable
        tests={filteredTests}
        loading={loading}
        onEdit={(test: any) => {
          navigate(`/admin/tests/${test.id}/edit`);
        }}
        onDelete={(test: any) => {
          if (test.id) {
            deleteTest(test.id);
          }
        }}
      />

      </div>

    </AdminLayout>
  );
}       