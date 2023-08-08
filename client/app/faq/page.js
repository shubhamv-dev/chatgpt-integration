const questionsAndAnswers = [
    {
      question: 'What are the different subscription plans available?',
      answer: 'We offer basic and premium monthly subscription plans as well as an enterprise plan for larger organizations. Each plan offers a certain number of words per month.',
    },
    {
      question: 'How many words do I get with each subscription plan?',
      answer: 'The number of words you get depends on the plan you choose. Our starter plan provides 5,000 words per month, and our professional plan provides 20,000 words per month.',
    },
    {
      question: 'What if I run out of words for the month?',
      answer: 'If you exhaust the monthly word limit, you can purchase additional words at a rate of $a per b words.',
    },
    {
      question: 'Do you offer any offers for long-term subscriptions?',
      answer: 'Yes, we offer a 20% discount if you pay upfront for a year.',
    },
    {
      question: 'What is the cost of the enterprise plan?',
      answer: 'The price of our enterprise plan varies based on the specific needs and usage of the enterprise. please contact us for quote.',
    },
    {
      question: 'How do i upgrade or downgrade my subscription?',
      answer: 'You can upgrade or downgrade your subscription at any time from your account settings the change will take effect at the start of your next billing period.',
    },
    {
      question: 'What is refund policy?',
      answer: 'We do not generally offer refund. but if you’re unhappy with the service for any reason, please contact us we’ll do our best to help . ',
    },
    {
      question: 'Is my data safe and private?',
      answer: 'Yes, your data is securely processed and we never store your data without your consent.',
    },
    {
      question: 'What kind of customer support do you offer?',
      answer: 'We offer prompt and helpful customer service for all users. Enterprise customers also get a dedicated account manager for personalized service and support.',
    },
  ];
  
  const FAQ = () => {
    
    return (
      <>
        <main className="container">
        <section className="faq_section">
            <h2 className="faq_heading">Frequently Asked Questions</h2>
            {questionsAndAnswers.map((item, index) => (
              <div key={index} className="faq_inner_container">
                <h3 className="faq_questions">{item.question}</h3>
                <p className="faq_answers">{item.answer}</p>
              </div>
            ))}
  
          </section>
        </main>
      </>
    );
  };
  
  export default FAQ;
  