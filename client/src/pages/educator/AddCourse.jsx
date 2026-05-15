import { ArrowDown, ArrowUp, BookOpen, Clock, DollarSign, Image, Link, Percent, Plus, Trash2, X } from "lucide-react";
import React, { useState } from "react";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const handleAddChapter = () => {
    const newChapter = {
      chapterId: Date.now(),
      chapterTitle: `Chapter ${chapters.length + 1}`,
      chapterContent: [],
      collapsed: false,
    };
    setChapters([...chapters, newChapter]);
  };

  const handleToggleCollapse = (chapterId) => {
    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.chapterId === chapterId
          ? { ...chapter, collapsed: !chapter.collapsed }
          : chapter
      )
    );
  };

  const handleDeleteChapter = (chapterId) => {
    setChapters((prev) => prev.filter((c) => c.chapterId !== chapterId));
  };

  const handleDeleteLecture = (chapterId, lectureIndex) => {
    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.chapterId === chapterId
          ? {
              ...chapter,
              chapterContent: chapter.chapterContent.filter((_, i) => i !== lectureIndex),
            }
          : chapter
      )
    );
  };

  const handleAddLecture = () => {
    if (!lectureDetails.lectureTitle || !lectureDetails.lectureDuration || !lectureDetails.lectureUrl) return;

    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.chapterId === currentChapterId
          ? { ...chapter, chapterContent: [...chapter.chapterContent, lectureDetails] }
          : chapter
      )
    );

    setLectureDetails({ lectureTitle: "", lectureDuration: "", lectureUrl: "", isPreviewFree: false });
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = { courseTitle, courseDescription, coursePrice, discount, image, chapters };
    console.log(courseData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Course</h1>
          <p className="text-sm text-gray-400 mt-0.5">Fill in the details to publish a new course</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Info Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Course Info</h2>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Title</label>
              <div className="relative">
                <BookOpen size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  type="text"
                  required
                  placeholder="e.g. Complete React Developer Course"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 transition-all"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Description</label>
              <textarea
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                rows={3}
                placeholder="Briefly describe what students will learn..."
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 transition-all resize-none"
              />
            </div>

            {/* Price & Discount */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Price</label>
                <div className="relative">
                  <DollarSign size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={coursePrice}
                    onChange={(e) => setCoursePrice(e.target.value)}
                    min={0}
                    placeholder="0"
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Discount (%)</label>
                <div className="relative">
                  <Percent size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    min={0}
                    max={100}
                    placeholder="0"
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Thumbnail</label>
              <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 rounded-xl px-4 py-4 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all">
                <Image size={18} className="text-gray-400 shrink-0" />
                <span className="text-sm text-gray-400">Click to upload thumbnail</span>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>
              {image && (
                <div className="mt-3 relative w-fit">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="thumbnail"
                    className="w-48 h-28 object-cover rounded-xl border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Chapters Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Course Content</h2>

            {chapters.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6 border-2 border-dashed border-gray-100 rounded-xl">
                No chapters yet. Click "Add Chapter" to get started.
              </p>
            )}

            {chapters.map((chapter, index) => (
              <div key={chapter.chapterId} className="border border-gray-100 rounded-xl overflow-hidden">

                {/* Chapter Header */}
                <div className="flex items-center justify-between bg-gray-50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleCollapse(chapter.chapterId)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {chapter.collapsed ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
                    </button>
                    <span className="text-sm font-semibold text-gray-700">
                      {index + 1}. {chapter.chapterTitle}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">
                      {chapter.chapterContent.length} lecture{chapter.chapterContent.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteChapter(chapter.chapterId)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                {/* Lectures */}
                {!chapter.collapsed && (
                  <div className="px-4 py-3 space-y-2">
                    {chapter.chapterContent.map((lecture, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2.5">
                        <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                          <span className="font-medium text-gray-800">{i + 1}. {lecture.lectureTitle}</span>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock size={11} /> {lecture.lectureDuration} mins
                          </span>
                          <a
                            href={lecture.lectureUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-xs text-emerald-600 hover:underline"
                          >
                            <Link size={11} /> Link
                          </a>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            lecture.isPreviewFree
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-gray-100 text-gray-500"
                          }`}>
                            {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteLecture(chapter.chapterId, i)}
                          className="text-red-400 hover:text-red-600 transition-colors ml-2 shrink-0"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => { setCurrentChapterId(chapter.chapterId); setShowPopup(true); }}
                      className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 mt-1 transition-colors"
                    >
                      <Plus size={14} /> Add Lecture
                    </button>
                  </div>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddChapter}
              className="flex items-center gap-2 text-sm font-semibold text-gray-600 border border-gray-200 hover:border-emerald-400 hover:text-emerald-600 px-4 py-2.5 rounded-xl transition-all w-full justify-center"
            >
              <Plus size={15} /> Add Chapter
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-semibold py-3 rounded-xl text-sm"
          >
            Publish Course
          </button>
        </form>
      </div>

      {/* Add Lecture Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-white font-bold text-base">Add Lecture</h2>
                <p className="text-emerald-200 text-xs">Fill in the lecture details</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X size={16} className="text-white" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-4">

              {/* Lecture Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Lecture Title</label>
                <div className="relative">
                  <BookOpen size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                    placeholder="e.g. Introduction to React"
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration (minutes)</label>
                <div className="relative">
                  <Clock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                    placeholder="e.g. 15"
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
              </div>

              {/* URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Lecture URL</label>
                <div className="relative">
                  <Link size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Free Preview Toggle */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                <span className="text-sm font-medium text-gray-700">Free Preview</span>
                <div
                  onClick={() => setLectureDetails({ ...lectureDetails, isPreviewFree: !lectureDetails.isPreviewFree })}
                  className={`relative w-9 h-5 rounded-full cursor-pointer transition-colors duration-200 ${lectureDetails.isPreviewFree ? "bg-emerald-500" : "bg-gray-200"}`}
                >
                  <div className={`absolute top-0.5 left-0.5 bg-white rounded-full h-4 w-4 transition-all duration-200 ${lectureDetails.isPreviewFree ? "translate-x-4" : "translate-x-0"}`} />
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-3 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddLecture}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
                >
                  Add Lecture
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;