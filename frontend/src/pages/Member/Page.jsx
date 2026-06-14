import React from "react";

const members = [
    {
        id: 1,
        name: "Bablu",
        image:
            "https://res.cloudinary.com/dw2gks8uv/image/upload/v1781377452/Bablu_kduani.webp",
    },
    {
        id: 2,
        name: "Subhadeep",
        image:
            "https://res.cloudinary.com/dw2gks8uv/image/upload/v1781377452/Subhadeep_xwmujx.webp",
    },
    {
        id: 3,
        name: "Rupam",
        image:
            "https://res.cloudinary.com/dw2gks8uv/image/upload/v1781377453/Rupam_wdbzj0.webp",
    },
    {
        id: 4,
        name: "Rana",
        image:
            "https://res.cloudinary.com/dw2gks8uv/image/upload/v1781377453/Rana_dzvqul.webp",
    },
    {
        id: 5,
        name: "Kanu",
        image:
            "https://res.cloudinary.com/dw2gks8uv/image/upload/v1781377452/kanu_cyrpa4.webp",
    },
    {
        id: 6,
        name: "Hulo",
        image:
            "https://res.cloudinary.com/dw2gks8uv/image/upload/v1781377452/hulo_qnwhzv.webp",
    },
    {
        id: 7,
        name: "Pukai",
        image:
            "https://res.cloudinary.com/dw2gks8uv/image/upload/v1781377452/ami_ejusu8.webp",
    },
    {
        id: 8,
        name: "Papai",
        image:
            "https://res.cloudinary.com/dw2gks8uv/image/upload/v1781377452/rahul_iewbel.webp",
    }
];

const Member = () => {
    return (
        <div className="min-h-screen bg-base-100 pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <p className="uppercase tracking-[0.35em] text-xs opacity-60 mb-3">
                        Community
                    </p>

                    <h1 className="text-4xl md:text-6xl font-serif">
                        Meet The Every Chutiya
                    </h1>

                    <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
                        The legendary personalities participating in the survey.
                    </p>
                </div>

                {/* Members Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8">
                    {members.map((member) => (
                        <div
                            key={member.id}
                            className="group relative overflow-hidden rounded-3xl border border-base-300 bg-base-200 shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="aspect-3/4 overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

                            {/* Name */}
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-white font-bold text-lg md:text-xl">
                                    {member.name}
                                </h3>

                                <p className="text-white/70 text-sm">
                                    Chutiya since birth, with a legacy of legendary chutiya-ness.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Member;