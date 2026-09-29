import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";

export default function GithubContributions() {

    const currentYear = new Date().getFullYear();

    const yearList = [...Array(8).keys()].map(
        (index) => currentYear - index
    );

    const [year, setYear] = useState(currentYear);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="flex min-h-screen w-full text-white flex flex-col items-center justify-center px-6 py-20">

            {/* Header */}
            <div className="w-full max-w-7xl flex items-center mb-12">
                <div className="w-full flex justify-center px-8 md:px-12 mb-12">
                    <div className="flex items-center gap-8">

                        <h1 className="text-5xl font-bold">
                            GitHub Contributions
                        </h1>

                        <select
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="
                                bg-[#16162a]
                                border border-white/10
                                rounded-xl
                                w-fit
                                px-5 py-3
                                outline-none
                                cursor-pointer
                            "
                        >
                            {yearList.map((itemYear) => (
                                <option key={itemYear} value={itemYear}>
                                    {itemYear}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Dropdown */}
                    {isOpen && (
                        <div
                            className="
                                absolute
                                right-0
                                mt-2
                                w-[130px]
                                rounded-xl
                                overflow-hidden
                                bg-[#16162a]
                                border border-white/10
                                shadow-2xl
                                z-50
                            "
                        >
                            {yearList.map((itemYear) => (
                                <button
                                    key={itemYear}
                                    onClick={() => {
                                        setYear(itemYear);
                                        setIsOpen(false);
                                    }}
                                    className="
                                        w-full
                                        flex items-center justify-between
                                        px-5 py-3
                                        text-sm
                                        text-gray-300
                                        hover:bg-white/5
                                        hover:text-white
                                        transition-colors
                                    "
                                >
                                    <span>{itemYear}</span>

                                    {year === itemYear && (
                                        <Check
                                            size={16}
                                            className="text-[#6969ff]"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* GitHub Calendar */}
            <div className="w-full flex justify-center px-4">
                <div className="w-fit max-w-full overflow-x-auto">
                    <GitHubCalendar
                        username="ishaan175pathak"
                        colorScheme="dark"
                        blockSize={16}
                        blockMargin={8}
                        fontSize={18}
                        year={year}
                        theme={{
                            dark: [
                                "#16162a",
                                "#292957",
                                "#4747a8",
                                "#6969ff",
                                "#a8a8ff",
                            ],
                        }}
                    />
                </div>
            </div>
        </section>
    );
}