const GeometricIcon = ({ type }: { type: 'pyramid' | 'squares' | 'circle' }) => {
    return (
        <div className={`geometric-icon geometric-${type}`}>
            <div className="geometric-shape"></div>
        </div>
    );
};



const LearnMoreSection = () => {
    return (
        <section className="learn-more-section" id="learn-more" >
            <div className="container">
                <div className="learn-more-grid">
                    {/* AI Chatbot */}
                    <div className="learn-card">
                        <h2>AI Chatbot</h2>
                        <p>Intelligent automated responses that understand context and engage your audience naturally. Our chatbot learns from interactions to provide increasingly personalized customer service 24/7.</p>
                        <GeometricIcon type="pyramid" />
                    </div>

                    {/* Trends Finder */}
                    <div className="learn-card">
                        <h2>Trends Finder</h2>
                        <p>Stay ahead of the curve with real-time trend analysis. Discover viral topics, hashtags, and content opportunities before they peak, helping you create timely and relevant content.</p>
                        <GeometricIcon type="squares" />
                    </div>

                    {/* Post Generator */}
                    <div className="learn-card">
                        <h2>Post Generator</h2>
                        <p>Create engaging social media content instantly. Our AI analyzes your brand voice and audience preferences to generate captivating posts optimized for each platform.</p>
                        <GeometricIcon type="circle" />
                    </div>
                </div>
            </div>
        </section>

    );
};

export default LearnMoreSection;