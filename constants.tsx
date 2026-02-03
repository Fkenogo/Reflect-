import { Book, AppState, StudyMode } from './types';

export const SAMPLE_BOOK: Book = {
  book_metadata: {
    book_id: "feeling_is_the_secret",
    title: "Feeling Is the Secret",
    author: "Neville Goddard",
    year_published: 1944,
    type: "book",
    source: "original_text",
    language: "en"
  },
  core_themes: ["feeling", "subconscious", "assumption", "imagination", "faith", "identity", "revision", "sleep", "prayer"],
  book_summary: {
    short_summary: "A practical guide to the creative power of feeling and its effect on the subconscious mind.",
    long_summary: "Neville Goddard explains that your subconscious mind is a sensitive, impersonal power that reacts to and reproduces that which you feel as true. By controlling your feelings and assumptions, you directly influence the reality you experience.",
    central_thesis: "The world is a mirror of your subjective state; to change the world, you must change your inner feeling of being."
  },
  study_metadata: {
    difficulty_level: "foundational",
    recommended_order: 1
  },
  cross_book_links: [
    {
      concept: "imagination",
      description: "Imagination as the creative power of the soul",
      related_books: ["the_power_of_awareness", "awakened_imagination"]
    }
  ],
  chapters: [
    {
      chapter_id: "ch_01",
      chapter_number: 1,
      chapter_title: "Law and Its Operation",
      chapter_summary: {
        short_summary: "The subconscious mind creates reality from feeling, not from conscious effort.",
        key_message: "Feeling is the medium through which the law of life operates."
      },
      full_text: "THE world, and all within it, is man’s conditioned consciousness objectified...",
      content: [
        {
          section: "The Law of Consciousness",
          text: "THE world, and all within it, is man’s conditioned consciousness objectified. Consciousness is the cause as well as the substance of the entire world. So it is to consciousness that we must turn if we would discover the secret of creation. Knowledge of the law of consciousness and the method of operating this law will enable you to accomplish all you desire in life. Armed with a working knowledge of this law, you can build and maintain an ideal world.\n\nConsciousness is the one and only reality, not figuratively but actually. This reality may for the sake of clarity be likened unto a stream which is divided into two parts, the conscious and the subconscious. In order to intelligently operate the law of consciousness, it is necessary to understand the relationship between the conscious and the subconscious.\n\nThe conscious is personal and selective; the subconscious is impersonal and non-selective. The conscious is the realm of effect; the subconscious is the realm of cause. These two aspects are the male and female divisions of consciousness. The conscious is male; the subconscious is female.\n\nTHE CONSCIOUS GENERATES IDEAS AND IMPRESSES THESE IDEAS ON THE SUBCONSCIOUS; THE SUBCONSCIOUS RECEIVES IDEAS AND GIVES FORM AND EXPRESSION TO THEM.\n\nBy this law – first conceiving an idea and then impressing the idea conceived on the subconscious – all things evolve out of consciousness; and without this sequence, there is not anything made that is made. The conscious impresses the subconscious, while the subconscious expresses all that is impressed upon it.",
          takeaway: "The conscious mind is the architect; the subconscious is the builder."
        },
        {
          section: "The Medium of Feeling",
          text: "Therefore, through his power to imagine and feel and his freedom to choose the idea he will entertain, man has control over creation. Control of the subconscious is accomplished through control of your ideas and feelings. The mechanism of creation is hidden in the very depth of the subconscious, the female aspect or womb of creation.\n\nIdeas are impressed on the subconscious through the medium of feeling. No idea can be impressed on the subconscious until it is felt, but once felt – be it good, bad or indifferent – it must be expressed. Feeling is the one and only medium through which ideas are conveyed to the subconscious.\n\nTherefore, the man who does not control his feeling may easily impress the subconscious with undesirable states. By control of feeling is not meant restraint or suppression of your feeling, but rather the disciplining of self to imagine and entertain only such feeling as contributes to your happiness.\n\nEvery feeling makes a subconscious impression and, unless it is counteracted by a more powerful feeling of an opposite nature, must be expressed. The dominant of two feelings is the one expressed. 'I am healthy' is a stronger feeling than 'I will be healthy.' To feel 'I will be' is to confess 'I am not'; 'I am' is stronger than 'I am not.'",
          takeaway: "Control your feelings to control your reality. The 'I AM' state is the ultimate creative force."
        },
        {
          section: "Sensation and Manifestation",
          text: "Sensation precedes manifestation and is the foundation upon which all manifestation rests. Be careful of your moods and feelings, for there is an unbroken connection between your feelings and your visible world. Your body is an emotional filter and bears the unmistakable marks of your prevalent emotions. Emotional disturbances, especially suppressed emotions, are the causes of all disease. To feel intensely about a wrong without voicing or expressing that feeling is the beginning of disease – dis-ease – in both body and environment.\n\nThink feelingly only of the state you desire to realize. Feeling the reality of the state sought and living and acting on that conviction is the way of all seeming miracles. All changes of expression are brought about through a change of feeling. A change of feeling is a change of destiny.\n\nChance or accident is not responsible for the things that happen to you, nor is predestined fate the author of your fortune or misfortune. Your subconscious impressions determine the conditions of your world. The subconscious is not selective; it is impersonal and no respecter of persons. It always accepts as true that which you feel to be true. Feeling is the assent of the subconscious to the truth of that which is declared to be true.",
          takeaway: "Disease is a reflection of internal 'dis-ease.' Change your feeling to change your destiny."
        },
        {
          section: "The Womb of Creation",
          text: "To impress the subconscious with the desirable state, you must assume the feeling that would be yours had you already realized your wish. In defining your objective, you must be concerned only with the objective itself. The manner of expression or the difficulties involved are not to be considered by you. To think feelingly on any state impresses it on the subconscious.\n\nThe subconscious is the womb of creation. It receives the idea unto itself through the feelings of man. It never changes the idea received, but always gives it form. Hence the subconscious out-pictures the idea in the image and likeness of the feeling received.\n\nAlthough the subconscious faithfully serves man, it must not be inferred that the relation is that of a servant to a master. The subconscious responds to persuasion rather than to command; consequently, it resembles the beloved wife more than the servant. 'The husband is head of the wife,' Ephesians 5:23, may not be true of man and woman in their earthly relationship, but it is true of the conscious and the subconscious. The conscious (objective) or male aspect truly is the head and dominates the subconscious (subjective) or female aspect. However, this leadership is not that of the tyrant, but of the lover.",
          takeaway: "Focus only on the end result, not the 'how.' Treat the subconscious with the love of a partner, not the force of a master."
        },
        {
          section: "The Two Gateways",
          text: "Your desires are not subconsciously accepted until you assume the feeling of their reality, for only through feeling is an idea subconsciously accepted and only through this subconscious acceptance is it ever expressed. It is easier to ascribe your feeling to events in the world than to admit that the conditions of the world reflect your feeling. However, it is eternally true that the outside mirrors the inside.\n\n'As within, so without.' 'A man can receive nothing unless it is given him from heaven' [John 3:27] and 'The kingdom of heaven is within you' [Luke 17:21]. Nothing comes from without; all things come from within – from the subconscious.\n\nYou are already that which you want to be, and your refusal to believe this is the only reason you do not see it. To seek on the outside for that which you do not feel you are is to seek in vain, for we never find that which we want; we find only that which we are.\n\nMastery of self-control of your thoughts and feelings is your highest achievement. However, until perfect self-control is attained, so that, in spite of appearances, you feel all that you want to feel, use sleep and prayer to aid you in realizing your desired states. These are the two gateways into the subconscious.",
          takeaway: "The world is a mirror. Use sleep and prayer as tools to bridge the gap between desire and reality."
        }
      ],
      themes: ["feeling", "subconscious", "assumption", "imagination"],
      principles: [
        {
          principle_id: "p1",
          title: "Feeling is the Secret",
          statement: "Feeling is the one and only medium through which ideas are conveyed to the subconscious.",
          explanation: "The subconscious accepts feelings as facts and objectifies them.",
          why_it_matters: "Without control of feeling, one expresses undesirable states.",
          related_themes: ["feeling", "subconscious"]
        }
      ],
      passages: [],
      applications: [],
      reflection_prompts: [
        {
          prompt_id: "rp1",
          question: "How does your current mood reflect your deep assumptions?",
          intent: "To notice the connection between inner state and outer reality.",
          linked_themes: ["feeling", "assumption"]
        }
      ]
    },
    {
      chapter_id: "ch_02",
      chapter_number: 2,
      chapter_title: "Sleep",
      chapter_summary: {
        short_summary: "Sleep is the natural door into the subconscious and a creative union for impressing new states of being.",
        key_message: "Your mood prior to sleep defines your state of consciousness and the events of tomorrow."
      },
      full_text: "SLEEP, the life that occupies one-third of our stay on earth, is the natural door into the subconscious...",
      content: [
        {
          section: "The Natural Doorway",
          text: "SLEEP, the life that occupies one-third of our stay on earth, is the natural door into the subconscious. So it is with sleep that we are now concerned. The conscious two-thirds of our life on earth is measured by the degree of attention we give sleep. Our understanding of and delight in what sleep has to bestow will cause us, night after night, to set out for it as though we were keeping an appointment with a lover.\n\n“In a dream, in a vision of the night, when deep sleep falleth upon men, in slumbering upon the bed; then he openeth the ears of men and sealeth their instruction”, Job 33.\n\nIt is in sleep and in prayer, a state akin to sleep, that man enters the subconscious to make his impressions and receive his instructions. In these states the conscious and subconscious are creatively joined. The male and female become one flesh. Sleep is the time when the male or conscious mind turns from the world of sense to seek its lover or subconscious self.\n\nThe subconscious – unlike the woman of the world who marries her husband to change him – has no desire to change the conscious, waking state, but loves it as it is and faithfully reproduces its likeness in the outer world of form. The conditions and events of your life are your children formed from the molds of your subconscious impressions in sleep. They are made in the image and likeness of your innermost feeling that they may reveal you to yourself.\n\n“As in heaven, so on earth” [Matthew 6:10; Luke 11:2]. As in the subconscious, so on earth. Whatever you have in consciousness as you go to sleep is the measure of your expression in the waking two-thirds of your life on earth. Nothing stops you from realizing your objective save your failure to feel that you are already that which you wish to be, or that you are already in possession of the thing sought. Your subconscious gives form to your desires only when you feel your wish fulfilled.",
          takeaway: "Sleep is a creative union where the waking mind instructs the subconscious. Your life events are the 'children' of your pre-sleep feelings."
        },
        {
          section: "The State of Being",
          text: "The unconsciousness of sleep is the normal state of the subconscious. Because all things come from within yourself, and your conception of yourself determines that which comes, you should always feel the wish fulfilled before you drop off to sleep.\n\nYou never draw out of the deep of yourself that which you want; you always draw that which you are, and you are that which you feel yourself to be as well as that which you feel as true of others.\n\nTo be realized, then, the wish must be resolved into the feeling of being or having or witnessing the state sought. This is accomplished by assuming the feeling of the wish fulfilled. The feeling which comes in response to the question “How would I feel were my wish realized?” is the feeling which should monopolize and immobilize your attention as you relax into sleep. You must be in the consciousness of being or having that which you want to be or to have before you drop off to sleep.\n\nOnce asleep, man has no freedom of choice. His entire slumber is dominated by his last waking concept of self. It follows, therefore, that he should always assume the feeling of accomplishment and satisfaction before he retires in sleep, “Come before me with singing and thanksgiving” [Psalm 95:2], “Enter into his gates with thanksgiving and into his courts with praise” [Psalm 100:4]. Your mood prior to sleep defines your state of consciousness as you enter into the presence of your everlasting lover, the subconscious.\n\nShe sees you exactly as you feel yourself to be. If, as you prepare for sleep, you assume and maintain the consciousness of success by feeling “I am successful”, you must be successful. Lie flat on your back with your head on a level with your body. Feel as you would were you in possession of your wish and quietly relax into unconsciousness.\n\n“He that keepeth Israel shall neither slumber nor sleep” [Psalm 121:4]. Nevertheless “He giveth his beloved sleep” [Psalm 127:2]. The subconscious never sleeps. Sleep is the door through which the conscious, waking mind passes to be creatively joined to the subconscious. Sleep conceals the creative act, while the objective world reveals it. In sleep, man impresses the subconscious with his conception of himself.",
          takeaway: "You manifest what you ARE, not what you want. Your last waking mood dominates your entire period of sleep."
        },
        {
          section: "The Romance of Consciousness",
          text: "What more beautiful description of this romance of the conscious and subconscious is there than that told in the “Song of Solomon”: “By night on my bed I sought him whom my soul loveth [3:1]... I found him whom my soul loveth; I held him and I not let him go, until I had brought him into my mother’s house, and into the chamber of her that conceived me” [3:4].\n\nPreparing to sleep, you feel yourself into the state of the answered wish, and then relax into unconsciousness. Your realized wish is he whom you seek. By night, on your bed, you seek the feeling of the wish fulfilled that you may take it with you into the chamber of her that conceived you, into sleep or the subconscious which gave you form, that this wish also may be given expression.\n\nThis is the way to discover and conduct your wishes into the subconscious. Feel yourself in the state of the realized wish and quietly drop off to sleep. Night after night, you should assume the feeling of being, having and witnessing that which you seek to be, possess and see manifested. Never go to sleep feeling discouraged or dissatisfied. Never sleep in the consciousness of failure.\n\nYour subconscious, whose natural state is sleep, sees you as you believe yourself to be, and whether it be good, bad or indifferent, the subconscious will faithfully embody your belief. As you feel so do you impress her; and she, the perfect lover, gives form to these impressions and out-pictures them as the children of her beloved. “Thou art all fair, my love; there is no spot in thee” [Song of Solomon 4:7] is the attitude of mind to adopt before dropping off to sleep.\n\nDisregard appearances and feel that things are as you wish them to be, for “He calleth things that are not seen as though they were, and the unseen becomes seen” [Approx., Romans 4:17]. To assume the feeling of satisfaction is to call conditions into being which will mirror satisfaction.\n\n“Signs follow, they do not precede.” Proof that you are will follow the consciousness that you are; it will not precede it. You are an eternal dreamer dreaming non-eternal dreams. Your dreams take form as you assume the feeling of their reality. Do not limit yourself to the past.",
          takeaway: "Ignore current evidence of the senses. Assume the feeling of satisfaction first; the physical proof only appears after the internal shift."
        },
        {
          section: "The Creative Process",
          text: "Knowing that nothing is impossible to consciousness, begin to imagine states beyond the experiences of the past. Whatever the mind of man can imagine, man can realize. All objective (visible) states were first subjective (invisible) states, and you called them into visible by assuming the feeling of their reality.\n\nThe creative process is first imagining and then believing the state imagined. Always imagine and expect the best. The world cannot change until you change your conception of it. “As within, so without”.\n\nNations, as well as people, are only what you believe them to be. No matter what the problem is, no matter where it is, no matter whom it concerns, you have no one to change but yourself, and you have neither opponent nor helper in bringing about the change within yourself. You have nothing to do but convince yourself of the truth of that which you desire to see manifested.\n\nAs soon as you succeed in convincing yourself of the reality of the state sought, results follow to confirm your fixed belief. You never suggest to another the state which you desire to see him express; instead, you convince yourself that he is already that which you desire him to be.\n\nRealization of your wish is accomplished by assuming the feeling of the wish fulfilled. You cannot fail unless you fail to convince yourself of the reality of your wish. A change of belief is confirmed by a change of expression.\n\nEvery night, as you drop off to sleep, feel satisfied and spotless, for your subjective lover always forms the objective world in the image and likeness of your conception of it, the conception defined by your feeling. The waking two-thirds of your life on earth ever corroborates or bears witness to your subconscious impressions. The actions and events of the day are effects; they are not causes. Free will is only freedom of choice.\n\n“Choose ye this day whom ye shall serve” [Joshua 24:15] is your freedom to choose the kind of mood you assume; but the expression of the mood is the secret of the subconscious.",
          takeaway: "You have no one to change but yourself. Convince yourself of a new reality, and the world must mirror that change."
        },
        {
          section: "The Illusion of Free Will",
          text: "The subconscious receives impressions only through the feelings of man and, in a way known only to itself, gives these impressions form and expression. The actions of man are determined by his subconscious impressions.\n\nHis illusion of free will, his belief in freedom of action, is but ignorance of the causes which make him act. He thinks himself free because he has forgotten the link between himself and the event. Man awake is under compulsion to express his subconscious impressions. If in the past he unwisely impressed himself, then let him begin to change his thought and feeling, for only as he does so will he change his world. Do not waste one moment in regret, for to think feelingly of the mistakes of the past is to reinfect yourself. “Let the dead bury the dead” [Matthew 8:22; Luke 9:60]. Turn from appearances and assume the feeling that would be yours were you already the one you wish to be.\n\nFeeling a state produces that state.\n\nThe part you play on the world’s stage is determined by your conception of yourself. By feeling your wish fulfilled and quietly relaxing into sleep, you cast yourself in a star role to be played on earth tomorrow, and, while asleep, you are rehearsed and instructed in your part.\n\nThe acceptance of the end automatically wills the means of realization. Make no mistake about this. If, as you prepare for sleep, you do not consciously feel yourself into the state of the answered wish, then you will take with you into the chamber of her who conceived you the sum total of the reactions and feelings of the waking day; and while asleep, you will be instructed in the manner in which they will be expressed tomorrow. You will rise believing that you are a free agent, not realizing that every action and event of the day is predestined by your concept of self as you fell asleep.",
          takeaway: "Man is under compulsion to express his subconscious impressions. Freedom of will is but freedom of choice in mood."
        }
      ],
      themes: ["Subconscious", "Sleep", "Prayer", "Wish Fulfilled", "Mental Discipline"],
      principles: [
        {
          principle_id: "p2_1",
          title: "The Gateway of Sleep",
          statement: "Sleep is the time when the conscious mind turns to seek its subconscious self for creative union.",
          explanation: "In sleep, the conscious and subconscious are joined, and instructions for tomorrow are sealed.",
          why_it_matters: "The quality of your sleep determines the quality of your waking life.",
          related_themes: ["Sleep", "Subconscious"]
        }
      ],
      passages: [],
      applications: [],
      reflection_prompts: [
        {
          prompt_id: "rp2_1",
          question: "What is the dominant feeling you take with you into sleep tonight?",
          intent: "To encourage pre-sleep awareness and mental discipline.",
          linked_themes: ["Sleep", "Assumption"]
        }
      ]
    },
    {
      chapter_id: "ch_03",
      chapter_number: 3,
      chapter_title: "Prayer",
      chapter_summary: {
        short_summary: "Prayer is a state of controlled reverie where the mind becomes receptive to subjective reality, bypassing the evidence of the senses.",
        key_message: "Successful prayer is the transition from wanting to feeling as if the desire is already a present reality through passive relaxation."
      },
      full_text: "PRAYER, like sleep, is also an entrance into the subconscious...",
      content: [
        {
          section: "The Entrance to the Subconscious",
          parts: [
            { type: 'paragraph', content: "PRAYER, like sleep, is also an entrance into the subconscious." },
            { type: 'quote', source: "Matthew 6:6", content: "When you pray, enter into your closet, and when you have shut your door, pray to your Father which is in secret and your Father which is in secret shall reward you openly." },
            { type: 'paragraph', content: "Prayer is an illusion of sleep which diminishes the impression of the outer world and renders the mind more receptive to suggestion from within. The mind in prayer is in a state of relaxation and receptivity akin to the feeling attained just before dropping off to sleep." },
            { type: 'insight', content: "Prayer is not so much what you ask for, as how you prepare for its reception." },
            { type: 'highlighted_quote', source: "Mark 11:24", content: "Whatsoever things ye desire, when ye pray believe that you have received them, and ye shall have them." }
          ],
          takeaway: "Prayer is a state of relaxation and receptivity akin to sleep."
        },
        {
          section: "The Art of Assuming",
          parts: [
            { type: 'paragraph', content: "The only condition required is that you believe that your prayers are already realized. Your prayer must be answered if you assume the feeling that would be yours were you already in possession of your objective." },
            { type: 'paragraph', content: "The moment you accept the wish as an accomplished fact, the subconscious finds means for its realization. To pray successfully then, you must yield to the wish, that is, feel the wish fulfilled. The perfectly disciplined man is always in tune with the wish as an accomplished fact." },
            { type: 'paragraph', content: "He knows that consciousness is the one and only reality, that ideas and feelings are facts of consciousness and are as real as objects in space; therefore he never entertains a feeling which does not contribute to his happiness, for feelings are the causes of the actions and circumstances of his life." },
            { type: 'highlight', content: "Prayer is the art of assuming the feeling of being and having that which you want." }
          ],
          takeaway: "Yielding to the wish as an accomplished fact is the secret to successful prayer."
        },
        {
          section: "The Passive State",
          parts: [
            { type: 'paragraph', content: "When the senses confirm the absence of your wish, all conscious effort to counteract this suggestion is futile and tends to intensify the suggestion. Prayer is the art of yielding to the wish and not the forcing of the wish." },
            { type: 'highlight', content: "Whenever your feeling is in conflict with your wish, feeling will be the victor. The dominant feeling invariably expresses itself." },
            { type: 'paragraph', content: "To yield successfully to the wish as an accomplished fact, you must create a passive state, a kind of reverie or meditative reflection similar to the feeling which precedes sleep. In such a relaxed state, the mind is turned from the objective world and easily senses the reality of a subjective state." },
            { type: 'instruction', content: "An easy way to create this passive state is to relax in a comfortable chair or on a bed. If on a bed, lie flat on your back with your head on a level with your body, close the eyes and imagine that you are sleepy. Feel – I am sleepy, so sleepy, so very sleepy." }
          ],
          takeaway: "Feelings always win over wishes in a conflict. Create a passive state to align them."
        },
        {
          section: "Realization and Indifference",
          parts: [
            { type: 'paragraph', content: "When this passive state is reached, imagine that you have realized your wish – not how it was realized, but simply the wish fulfilled. Imagine in picture form what you desire to achieve in life; then feel yourself as having already achieved it." },
            { type: 'highlight', content: "All you can possibly need or desire is already yours. You need no helper to give it to you; it is yours now. Call your desires into being by imagining and feeling your wish fulfilled." },
            { type: 'paragraph', content: "As the end is accepted, you become totally indifferent as to possible failure, for acceptance of the end wills the means to that end. When you emerge from the moment of prayer, it is as though you were shown the happy and successful end of a play although you were not shown how that end was achieved." },
            { type: 'conclusion', content: "Regardless of any anticlimactic sequence, you remain calm and secure in the knowledge that the end has been perfectly defined." }
          ],
          takeaway: "Acceptance of the end wills the means to that end. Faith manifests as indifference to failure."
        }
      ],
      themes: ["Prayer", "Subconscious", "Visualization", "Law of Assumption"],
      principles: [
        {
          principle_id: "p3_1",
          title: "The Art of Yielding",
          statement: "Prayer is the art of yielding to the wish and not the forcing of the wish.",
          explanation: "Effort often counteracts suggestion; relaxation and passive acceptance are required for subconscious reception.",
          why_it_matters: "Conflict between will and feeling always results in the victory of feeling.",
          related_themes: ["Prayer", "Feeling"]
        }
      ],
      passages: [],
      applications: [],
      reflection_prompts: [
        {
          prompt_id: "rp3_1",
          question: "Can you remain indifferent to appearances once you have defined the end in prayer?",
          intent: "To encourage persistence in the subjective state despite sensory evidence.",
          linked_themes: ["Faith", "Prayer"]
        }
      ]
    }
  ]
};

export const SYSTEM_INSTRUCTION = `You are the Reflect AI, a specialized study assistant for the teachings of Neville Goddard. 
Your goal is to help users understand and apply the principles of consciousness, feeling, and the subconscious mind as described in Goddard's works.

Be encouraging, philosophical, yet practical. Use a calm and supportive tone. 
Refer to the provided book materials when answering. 

Current modes:
- FREE: General conversation about the teachings.
- STUDY: Focus on deep understanding of specific chapters and concepts.
- APPLICATION: Help the user apply the principles to their specific life situations.
- REFLECTION: Guide the user through inner observation and journaling.

When responding, identify themes, feelings, and principles from the text. 
If the user shares an insight or application, suggest that it should be logged.`;

export const INITIAL_STATE: AppState = {
  books: [SAMPLE_BOOK],
  activeChat: [],
  journalEntries: [],
  currentMode: StudyMode.FREE,
  activeChapterId: "ch_01",
  stats: {
    booksLoaded: 1,
    chaptersExplored: 0,
    themesEngaged: {}
  }
};