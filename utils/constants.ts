/** Whiteout Survival official launch date */
export const WOS_LAUNCH_DATE = '2023-02-09'

/** Format for displaying date in YYYY-MM-DD format */
export const DATE_FORMAT = 'YYYY-MM-DD'

/** Format for displaying date and time in YYYY-MM-DD HH:mm:ss format */
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

/**
 * Time format constants used across the application
 */
export const TIME_FORMATS = {
  /** Format for displaying time with hours, minutes and seconds (HH:mm:ss) */
  LONG_TIME: 'HH:mm:ss',
  /** Short time format (HH:mm) */
  SHORT_TIME: 'HH:mm',
} as const

/**
 * Time display options for different locales
 */
export const TIME_DISPLAY_OPTIONS = {
  /** Options for displaying time in 12-hour format */
  HOUR_12: {
    hour: 'numeric',
    hour12: true,
    minute: '2-digit',
  },
  /** Options for displaying time in 24-hour format */
  HOUR_24: {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  },
} as const

/**
 * Collection of polar bear facts with metric/imperial conversions
 */
export const POLAR_BEAR_FACTS = [
  'Polar bears have transparent, not white, fur',
  'Polar bears can swim for days at a time',
  'Polar bears can weigh up to 680kg (1,500 lbs)',
  'Polar bears can run at speeds of up to 40 km/h (25 mph)',
  'Polar bears have black skin to absorb heat',
  'Polar bears are mostly left-handed hunters',
  'Polar bears have 30cm (12 inch) wide paws',
  'Polar bear cubs are born blind and hairless',
  'Polar bears can detect seals through 1m (3.3 ft) thick ice',
  'Polar bear livers contain toxic vitamin A levels',
  'Polar bears are classified as marine mammals',
  'Polar bears can weigh as much as 10 adult humans',
  'Polar bears are called "ursus maritimus" in Latin, which translates to "sea bear."',
  'Polar bears live 25-30 years in the wild',
  'Polar bears can eat 45kg (100 lbs) of blubber in one sitting',
  'Polar bears are excellent swimmers from birth',
  'Polar bears have 42 teeth designed for meat-eating',
  'Polar bears can walk up to 100km (62 miles) in a day',
  'Polar bears are the largest land carnivores',
  'Polar bears never hibernate like other bears',
  'Polar bears have a powerful sense of direction',
  'Polar bears can see clearly underwater',
  'Polar bears have over 100 million scent receptors',
  'Polar bears can navigate in complete darkness',
  'Polar bears have fur on the bottom of their paws',
  'Polar bears can survive in temperatures as low as -50°C (-58°F)',
  'Polar bears are born in snow dens during winter',
  'Polar bears can hold their breath for up to 2 minutes',
  'Polar bears clean themselves by rolling in snow',
  'Polar bears use tools to hunt their prey',
  'Polar bears can dive up to 6m (20 ft) deep',
  'Polar bears have excellent hearing and eyesight',
  'Polar bears spend 50% of their time hunting',
  'Polar bears can reach speeds of 10 km/h (6 mph) while swimming',
  'Polar bears can grow to 3m (10 ft) in length',
  'Polar bears have a layer of blubber up to 11cm (4.3 inch) thick',
  'Polar bears can jump 2m (6.6 ft) out of the water',
  'Polar bears can clear holes in ice up to 60cm (2 ft) thick',
  'Polar bears typically give birth to twins',
  'Polar bears\' noses can smell a seal on the ice 32km (20 mi) away',
  'Polar bears can fast for up to 8 months during tough times',
  'Polar bears have no natural predators as adults',
  'Polar bear cubs weigh about 0.5kg (1.1 lbs) at birth',
  'Polar bears can live up to 40 years in captivity',
  'Polar bears are known as "sea bears" scientifically',
  'Polar bears are classified as marine mammals by scientists',
  'Polar bears maintain a body temperature of 37°C (98.6°F)',
  'Polar bears can delay pregnancy if conditions aren\'t right',
  'Polar bears have been known to adopt orphaned cubs',
  'Polar bears\' paw pads have special gripping bumps',
  'Polar bear livers contain lethal levels of Vitamin A',
  'Polar bears can detect seal breathing holes from up to 1km (0,62 mi) away',
  'Polar bears can swim 100km (62 mi) without resting',
  'Polar bears\' fur reflects UV light for camouflage',
  'Polar bear cubs learn survival for 2-3 years from mothers',
  'Polar bears can break thick ice with a single strike',
  'Polar bears\' paws are larger than human heads',
  'Polar bears catch fish using their sharp claws',
  'Polar bears reach top speed in just a few steps',
  'Polar bears\' stomachs hold 20% of their body weight',
  'Polar bears\' water-repellent fur allows quick drying',
  'Polar bears have specialized snow-protective eyelids',
  'Polar bears\' necks can exceed 1m (3.3 ft) around',
  'Polar bears\' claws reach 10cm (4 inches) in length',
  'Polar bears sometimes play with dogs in the wild',
  'Polar bears rest up to 20 hours after large meals',
  'Polar bear cubs study hunting for three years',
  'Polar bears grow fur up to 15cm (6 inches) long',
  'Polar bears groom regularly for insulation',
  'Polar bears swim using powerful front paw strokes',
  'Polar bear brains are twice the size of human brains',
  'Polar bears find breathing holes under snow cover',
  'Polar bears demonstrate tool use while hunting',
  'Polar bears hear as well as humans do',
  'Polar bear milk contains 31% fat for rapid growth',
  'Polar bears see colors despite Arctic whiteness',
  'Polar bears possess excellent depth perception',
  'Polar bears can crush seal skulls in one bite',
  'Polar bears communicate through body language',
  'Polar bears exhibit different hunting techniques',
  'Polar bears adapt hunting methods by age and experience',
  'Polar bears create daybed shelters in the snow',
  'Polar bears travel thousands of miles yearly',
  'Polar bears recognize individual bear scents',
  'Polar bears possess excellent problem-solving skills',
  'Polar bears show distinct personality traits',
  'Polar bears demonstrate remarkable memory abilities',
  'Polar bears use sea ice as hunting platforms',
  'Polar bears can smell prey through 3 feet of ice and snow',
  'Polar bears mate on sea ice in spring',
  'Polar bears show strong maternal instincts',
  'Polar bears can live solitary or social lives',
  'Polar bears establish territorial boundaries',
  'Polar bears use facial expressions to communicate',
  'Polar bears create complex hunting strategies',
  'Polar bears show remarkable navigation skills',
  'Polar bears exhibit playful behaviors throughout life',
  'Polar bears use smell to track potential mates',
  'Polar bears can remember successful hunting spots',
  'Polar bears show preference for specific den sites',
  'Polar bears maintain complex social hierarchies',
  'Polar bears teach survival skills to their young',
  'Polar bears demonstrate excellent balance abilities',
  'Polar bears use sea currents for hunting',
  'Polar bears can judge ice thickness by sound',
  'Polar bears show advanced learning capabilities',
  'Polar bears use wind direction while hunting',
  'Polar bears possess exceptional stamina levels',
  'Polar bears demonstrate strategic hunting patterns',
  'Polar bears show remarkable patience while hunting',
  'Polar bears use breathing holes as hunting posts',
  'Polar bears maintain consistent migration routes',
  'Polar bears show strong swimming abilities from youth',
  'Please don\'t kill me',
] as const

/**
 * Toast notification for arena alert before reset
 */
export const ARENA_TOAST = {
  detail: 'GO KILL!',
  summary: '⚔️ ARENA!',
} as const
