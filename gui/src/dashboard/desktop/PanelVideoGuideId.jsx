import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTutorialStore from "../../store/tutorialStore";

const PanelVideoGuideId = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const {
        selectedTutorial,
        fetchTutorialById,
        loading
    } = useTutorialStore();

    useEffect(() => {
        fetchTutorialById(id);
    }, [id, fetchTutorialById]);

    if (loading || !selectedTutorial) {
        return (
            <div className="min-h-screen bg-zinc-950 text-white p-8">
                Loading tutorial...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8">

            {/* Back */}
            <button
                onClick={() => navigate(-1)}
                className="mb-6 text-sm bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition cursor-pointer"
            >
                ← Back
            </button>

            <div className="max-w-4xl mx-auto">

                {/* Video */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800 mb-6">
                    <iframe
                        src={`https://www.youtube.com/embed/${selectedTutorial.videoID}?rel=0&modestbranding=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold mb-2">
                    {selectedTutorial.title}
                </h1>

                {/* Author */}
                <p className="text-zinc-400 mb-6">
                    By {selectedTutorial.author?.displayName}
                </p>

                {/* Info */}
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <p className="text-zinc-400 text-sm">
                        Uploaded {new Date(selectedTutorial.createdAt).toLocaleDateString()}
                    </p>
                </div>

            </div>

        </div>
    );
};

export default PanelVideoGuideId;